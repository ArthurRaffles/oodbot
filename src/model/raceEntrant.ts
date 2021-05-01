import { createId } from "../utils";
import { ClassHandicap } from "./class";

export type RaceEntrant = {
  id: string;
  fullname?: string;
  boatClass?: string | null;
  py?: number;
  finishTime?: string | null;
  correctedSeconds?: number;
};

export namespace RaceEntrant {
  export const create = (
    fullname?: string,
    boatClass?: ClassHandicap | null,
    finishTime?: string | null,
    correctedSeconds?: number
  ): RaceEntrant => {
    return {
      id: createId(),
      fullname,
      boatClass: boatClass?.className,
      py: boatClass?.number,
      finishTime,
      correctedSeconds
    };
  };
}
