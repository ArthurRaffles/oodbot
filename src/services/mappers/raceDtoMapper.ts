import { Race } from "../../model";
import { RaceDto } from "../dtos";

export const mapToRace = (dto?: RaceDto): Race | undefined => {
    if (!dto) {
        return undefined;
    }
  return {
    ...dto,
    entrants: [...dto.entrants.items],
  };
};
