import { Race } from "../model";
import { API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { listRaces } from "../graphql/queries";
import { createRace, createEntrant, deleteRace } from "../graphql/mutations";

export type RaceService = {
  saveRace(race: Race): Promise<any>;
  deleteRace(race: Race): Promise<GraphQLResult>;
  fetchRaces(): Promise<Race[] | undefined>;
};

type RacesResponse = {
  listRaces: {
    items: Race[];
  };
};

export function raceService(): RaceService {
  return {
    async saveRace(race: Race): Promise<any> {
      const entrants = race.entrants.map((entant) => {
        return {
          ...entant,
          raceID: race.id,
        };
      });
      const updatedRace = {
        id: race.id,
        start: race.start,
        name: race.name,
        seriesId: race.seriesId,
      };

      const foo = API.graphql({
        query: createRace,
        variables: { input: updatedRace },
      }) as Promise<GraphQLResult>;
      foo.then((res) => {
        return Promise.all(
          entrants.map((ent) => {
            return API.graphql({
              query: createEntrant,
              variables: { input: ent },
            }) as Promise<GraphQLResult>;
          })
        );
      });
      return foo;
    },

    async fetchRaces(): Promise<Race[] | undefined> {
      const apiData: GraphQLResult<RacesResponse> = (await API.graphql({
        query: listRaces,
      })) as GraphQLResult<RacesResponse>;

      return apiData.data?.listRaces?.items;
    },

    async deleteRace(race: Race): Promise<GraphQLResult> {
        return API.graphql({
          query: deleteRace,
          variables: { input: race },
        }) as Promise<GraphQLResult>;

      },
  };
}
