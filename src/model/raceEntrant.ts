import { createId } from "../utils";
import { ClassHandicap } from "./class";
import { AdjustedResult } from "./pyCalculator";

export type RaceEntrant = {
  id: string;
  fullname: string;
  boatClass: string;
  py: number;
  finishTime: string;
  elapsedSeconds?: number;
  correctedSeconds?: number;
};

export namespace RaceEntrant {
  export const create = (
    fullname: string,
    boatClass: ClassHandicap,
    finishTime: string
  ): RaceEntrant => {
    return {
      id: createId(),
      fullname,
      boatClass: boatClass.className,
      py: boatClass.number,
      finishTime,
    };
  };

  export const withResult = (
    entrant: RaceEntrant,
    result: AdjustedResult
  ): RaceEntrant => {
    return {
      ...entrant,
      ...result
    }
  };
}
