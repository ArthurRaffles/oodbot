import { DateTime } from "luxon";
import React, { createContext, useContext, useState } from "react";
import { Race, RaceEntrant } from "../model";

export const useRaceContext = () => {
    const [races, setRaces] = useState<Race[]>([]);
    const [selectedRace, setSelectedRace] = useState<Race | null | undefined>(null);
    const createRace = (name: string, start: string) => {
        const newRace = Race.create(name, start);
        console.warn("creating race ", name, start);
        setRaces([
            ...races,
            newRace
        ]);
        setSelectedRace(newRace);
    };
    const addRacer = (entrant: RaceEntrant, raceId?: string) => {
        console.warn("caddRacer", raceId, entrant);
        if (!raceId) {
            console.warn("no race id passed", raceId);
            return;
        }
        const newRaces = races.map((r) => {
            if (r.id === raceId) {
              return {
                ...r, 
                entrants: [...r.entrants, entrant],
              };
            }
            return r;
          });
          setRaces(newRaces);
          setSelectedRace(newRaces.find((r) => r.id === raceId));
    };
    const context = createContext({
        races,
        createRace,
        selectedRace,
        addRacer
    });
    return  useContext(context);
};