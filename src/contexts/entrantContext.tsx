import React, { createContext, useState } from "react";
// const pyNumbersRaw: ClassHandicap[] = require("./py2021.json");
export type Entrant = {
  fullname: string;
};

type EntrantContext = {
  getEntrantList(): Entrant[];
  saveEntrant(entrant: Entrant): void;
};
const defaultContext = createEntrantContext();
const EntrantDataContext: React.Context<EntrantContext> = createContext(
  defaultContext
);

function createEntrantContext(): EntrantContext {
  let entrants: Entrant[] = [
    { fullname: "david ashton" },
    { fullname: "david pegg" },
    { fullname: "andy smith" },
  ];

  return {
    getEntrantList(): Entrant[] {
      return entrants;
    },
    saveEntrant(entrant: Entrant) {
        entrants = [
            ...entrants,
            entrant
        ]
    },
  };
}

type Props = {
  children: React.ReactNode;
};
export const EntrantContextProvider = ({ children }: Props) => {
  return (
    <EntrantDataContext.Provider value={defaultContext}>
      {children}
    </EntrantDataContext.Provider>
  );
};

export const useEntrantContext = () => React.useContext(EntrantDataContext);
