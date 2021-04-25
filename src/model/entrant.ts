import { DateTime } from "luxon";

export type Entrant = {
  id: string;
  fullname: string;
  boatClass: string;
  finishTime?: DateTime;
};

export namespace Entrant {
  export const create = (fullname: string, boatClass: string): Entrant => {
    return {
      id: Date.now().toLocaleString(),
      fullname,
      boatClass,
    };
  };
}
