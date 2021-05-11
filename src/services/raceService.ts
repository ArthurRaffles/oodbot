import { Race, RaceEntrant } from "../model";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { listRaces, listEntrants, getRace } from "../graphql/queries";
import {
  createRace,
  createEntrant,
  deleteRace,
  updateRace,
  updateEntrant,
} from "../graphql/mutations";

export type RaceService = {
  saveRace(race: Race): Promise<any>;
  deleteRace(race: Race): Promise<GraphQLResult>;
  fetchRaces(): Promise<Race[] | undefined>;
  fetchEntrants(nextToken: string): Promise<RaceEntrant[] | undefined>;
  fetchRace(raceId: string): Promise<Race | undefined>;
};

type RacesResponse = {
  listRaces: {
    items: Race[];
  };
};
type EntrantsResponse = {
  listEntrants: {
    items: RaceEntrant[];
  };
};
type RaceResponse = {
  getRace: {
    item: Race;
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
      const operation = !!race.createdAt ? updateRace : createRace;
      const foo = API.graphql({
        query: operation,
        variables: { input: updatedRace },
      }) as Promise<GraphQLResult>;
      foo.then((res) => {
        return Promise.all(
          entrants.map((ent) => {
            const op = !!ent.createdAt ? updateEntrant : createEntrant;
            return API.graphql({
              query: op,
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

    async fetchRace(id: string): Promise<Race | undefined> {
      console.warn("fetchRace ", id);

      const apiData: GraphQLResult<RaceResponse> = (await API.graphql({
        query: getRace,
        variables: { id },
      })) as GraphQLResult<RaceResponse>;
      console.warn("fetched race", apiData.data);
      return apiData.data?.getRace.item;
    },

    async fetchEntrants(raceID: string): Promise<RaceEntrant[] | undefined> {
      const apiData: GraphQLResult<EntrantsResponse> = (await API.graphql(
        graphqlOperation(listEntrants, {
          raceID,
        })
      )) as GraphQLResult<EntrantsResponse>;

      return apiData.data?.listEntrants?.items;
    },

    async deleteRace(race: Race): Promise<GraphQLResult> {
      const foo =  API.graphql(
        graphqlOperation(deleteRace, {
          raceID: race.id,
        })
      ) as Promise<GraphQLResult>;
      foo.catch(reason => console.warn('del failed', reason));
      return foo;
    },
  };
}
