import React, { createContext, useState } from "react";
import { calculateAdjustedTime, Race, RaceEntrant } from "../model";
import { raceService } from "../services";

type RaceContextType = {
  createRace: (name: string, start: string) => void;
  deleteRace: (id: string) => void;
  addRacer: (entrant: RaceEntrant, raceId?: string) => void;
  deleteRacer: (entrantId: string, raceId: string) => void;
  saveRace: () => void;
  fetchRaces: () => void;
  selectedRace?: Race | null;
  races: Race[];
};

export const RaceContext = createContext<RaceContextType>({
  createRace: (name: string, start: string) => {},
  deleteRace: (id: string) => {},
  addRacer: (entrant: RaceEntrant, raceId?: string) => {},
  deleteRacer: (entrantId: string, raceId: string) => {},
  saveRace: () => {},
  fetchRaces: () => {},
  races: [],
});

type ProviderProps = {
  children: any;
};

const service = raceService();
export const RaceContextProvider = ({ children }: ProviderProps) => {
    console.warn("creatig RaceContextProvider");
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRace, setSelectedRace] = useState<Race | null | undefined>(
    null
  );

  const deleteRacer = (entrantId: string, raceId: string) => {
    console.warn("deleting racer", entrantId, raceId);
    const newRaces = races.map((r) => {
      if (r.id === raceId) {
        return {
          ...r,
          entrants: r.entrants.filter((ent) => ent.id !== entrantId),
        };
      }
      return r;
    });
    setRaces(newRaces);
    setSelectedRace(newRaces.find((r) => r.id === raceId));
  };

  const createRace = (name: string, start: string) => {
    const newRace = Race.create(name, start);
    console.warn("creating race ", name, start);
    setRaces([...races, newRace]);
    setSelectedRace(newRace);
  };

  const deleteRace = (raceId: string) => {
    console.warn("deleting race ", raceId);
    const theRace = races.find((r) => r.id === raceId);
    if (!theRace) {
      console.warn("couldnot find race to delete", raceId);
      return;
    }
    service
      .deleteRace(theRace)
      .then((res) => {
        console.warn("delete race success?", res);
        if (!res.errors) {
          const newRaces = races.filter((r) => {
            return r.id !== raceId;
          });
          setRaces(newRaces);
        }
      })
      .catch((reason) => {
        console.warn("race delete failed", reason);
      });
  };

  const addRacer = (entrant: RaceEntrant, raceId?: string) => {
    console.warn("addRacer", raceId, entrant);
    if (!raceId) {
      console.warn("no race id passed", raceId);
      return;
    }
    const theRace = races.find((r) => r.id === raceId);
    if (!theRace) {
      console.warn("no race found", raceId);
      return;
    }

    const adjustedTime = calculateAdjustedTime(
      theRace.start,
      entrant.finishTime,
      entrant.py
    );
    const updatedEntrant = RaceEntrant.withResult(entrant, adjustedTime);
    const newRaces = races.map((r) => {
      if (r.id === raceId) {
        return {
          ...r,
          entrants: [...r.entrants, updatedEntrant],
        };
      }
      return r;
    });
    setRaces(newRaces);
    setSelectedRace(newRaces.find((r) => r.id === raceId));
  };

  const saveRace = () => {
    if (selectedRace) {
      console.warn("context, saving race", selectedRace);
      service
        .saveRace(selectedRace)
        .catch((reason) => {
          console.warn("race save failed", reason);
        })
        .then((res) => console.warn("saved race success?", res));
    }
  };

  const fetchRaces = () => {
      if (races?.length > 0) {
        console.warn("context, has races not fetching", selectedRace);
        return;
      }
    console.warn("context, fetching races", selectedRace);
    service
      .fetchRaces()
      .then((races) => {
        console.warn("fetched ok", races);
        if (races) {
          setRaces(races);
        }
      })
      .catch((reason) => {
        console.warn("race fetch failed", reason);
      });
  };

  return (
    <RaceContext.Provider
      value={{
        createRace,
        deleteRace,
        addRacer,
        deleteRacer,
        races,
        selectedRace,
        saveRace,
        fetchRaces,
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};
