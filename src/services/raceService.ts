import { Race, RaceEntrant } from "../model";
import { API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { listRaces, getRace } from "../graphql/queries";
import {
  createRace,
  createEntrant,
  deleteRace,
  updateRace,
  updateEntrant,
  deleteEntrant,
} from "../graphql/mutations";
import { RaceDto } from "./dtos";
import { mapToRace } from "./mappers";

export type RaceService = {
  saveRace(race: Race): Promise<any>;
  deleteRace(race: Race): Promise<GraphQLResult>;
  fetchRaces(): Promise<Race[] | undefined>;
  fetchRace(raceId: string): Promise<Race | undefined>;
};

type RacesResponse = {
  listRaces: {
    items: Race[];
  };
};

type RaceResponse = {
  getRace: RaceDto;
};

export function raceService(): RaceService {
  return {
    async saveRace(race: Race): Promise<any> {

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
          race.entrants.map((entrant) => {
            const updatedEnt = {
              id: entrant.id,
              boatClass: entrant.boatClass,
              finishTime: entrant.finishTime,
              fullname: entrant.fullname,
              py: entrant.py,
              correctedSeconds: entrant.correctedSeconds,
              elapsedSeconds: entrant.elapsedSeconds,
              raceID: race.id,
            } as RaceEntrant;
            const op = !!entrant.createdAt ? updateEntrant : createEntrant;
            return API.graphql({
              query: op,
              variables: { input: updatedEnt },
            }) as Promise<GraphQLResult>;
          })
        );
      });
      return foo;
    },

    async deleteRace(race: Race): Promise<GraphQLResult> {
      return this.fetchRace(race.id).then((raceFromServer) => {
        console.warn("deleteRace fetch race first ", raceFromServer);
        if (!raceFromServer) {
          return Promise.reject(`didn't find the race to delete: ${race?.id}`);
        }
        return Promise.all(
          raceFromServer.entrants.map((ent) => {
            return API.graphql({
              query: deleteEntrant,
              variables: { input: { id: ent.id } },
            }) as Promise<GraphQLResult>;
          })
        ).then((resw) => {
          return API.graphql({
            query: deleteRace,
            variables: { input: { id: race.id } },
          }) as Promise<GraphQLResult>;
        });
      });
    },

    async fetchRaces(): Promise<Race[] | undefined> {
      const apiData: GraphQLResult<RacesResponse> = (await API.graphql({
        query: listRaces,
      })) as GraphQLResult<RacesResponse>;

      return apiData.data?.listRaces?.items?.map((r) => ({
        ...r,
        entrants: [],
      }));
    },

    async fetchRace(id: string): Promise<Race | undefined> {
      console.warn("fetching Race ", id);
      return (API.graphql({
        query: getRace,
        variables: { id },
      }) as Promise<GraphQLResult<RaceResponse>>).then((apiData) => {
        console.warn("fetched race", apiData.data);
        return mapToRace(apiData.data?.getRace);
      });
    },
  };
}
