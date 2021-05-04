import React, { createContext } from "react";
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
      if (
        !entrants.find(
          (ent) =>
            ent.fullname.toLocaleUpperCase() ===
            entrant.fullname.toLocaleUpperCase()
        )
      ) {
        entrants = [...entrants, entrant];
      }
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
