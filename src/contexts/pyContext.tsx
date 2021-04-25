import React, { createContext, useState } from "react";
const pyNumbersRaw: ClassHandicap[] = require("./py2021.json");
export type ClassHandicap = {
  className: string;
  number?: number;
};

type PyContext = {
  getPyNumber(className: string | null): number | undefined;
  getClassList(): ClassHandicap[];
};
const defaultContext = createPyContext();
const PyDataContext: React.Context<PyContext> = createContext(defaultContext);

function createPyContext(): PyContext {
  const pyNumbers = pyNumbersRaw.reduce((map, cls) => {
    return map.set(cls.className, cls.number ?? 0);
  }, new Map<string, number>());
  console.warn("creating py context", pyNumbersRaw, pyNumbers);

  return {
    getPyNumber(className: string): number | undefined {
      return pyNumbers.get(className);
    },

    getClassList(): ClassHandicap[] {
      return pyNumbersRaw;
    },
  };
}

type Props = {
  children: React.ReactNode;
};
export const PyContextProvider = ({ children }: Props) => {
  return (
    <PyDataContext.Provider value={defaultContext}>
      {children}
    </PyDataContext.Provider>
  );
};

export const usePyContext = () => React.useContext(PyDataContext);
