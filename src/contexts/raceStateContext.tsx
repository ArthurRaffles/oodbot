import React, { createContext, useState } from "react";
import { calculateAdjustedTime, Race, RaceEntrant } from "../model";
import { raceService } from "../services";

type RaceContextType = {
  createRace: (name: string, start: string) => void;
  addRacer: (entrant: RaceEntrant, raceId?: string) => void;
  deleteRacer: (entrantId: string, raceId: string) => void;
  saveRace: () => void;
  fetchRaces: () => void;
  selectedRace?: Race | null;
  races: Race[];
  // service?: RaceService;
};

export const RaceContext = createContext<RaceContextType>({
  createRace: (name: string, start: string) => {},
  addRacer: (entrant: RaceEntrant, raceId?: string) => {},
  deleteRacer: (entrantId: string, raceId: string) => {},
  saveRace: () => {},
  fetchRaces: () => {},
  // selectedRace: null,
  races: [],
});

type ProviderProps = {
  children: any;
};

const service = raceService();
export const RaceContextProvider = ({ children }: ProviderProps) => {
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
    // guard(theRace.start, 'somehow you have no start');
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
      service.saveRace(selectedRace).catch((reason) => {
        console.warn("race save failed", reason);
      }).then(res => console.warn('saved race success?', res));
    }
  };

  const fetchRaces = () => {
    console.warn("context, fetching races", selectedRace);
    service
      .fetchRaces()
      .then((races) => console.warn("fetched ok", races))
      .catch((reason) => {
        console.warn("race fetch failed", reason);
      });
  };

  return (
    <RaceContext.Provider
      value={{
        createRace,
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
