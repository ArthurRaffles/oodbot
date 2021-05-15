import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RaceHeader } from "./raceHeader";
import { EntrantInput } from "./entrantInput";

import { useAppDispatch} from "../../hooks";
import { createRace, addRacer, saveRace } from "../../store/raceState";
import { Race } from "../../model";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "200px",
  },
}));

export interface RaceProps  {
  race?: Race;
}
export function RaceInput({race}: RaceProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const onSaveRace = () => {
    dispatch(saveRace(race));
  };
  const onCreateRace = (name: string, start: string) => {
    dispatch(createRace({name, start}));
  };
  return (
    <div className={classes.container}>
      <RaceHeader
        saveRace={onSaveRace}
        race={race}
        createRace={onCreateRace}
      />
      {!!race && (
        <EntrantInput
          onChange={(entrant) => dispatch(addRacer({entrant, raceId: race?.id}))}
        />
      )}
    </div>
  );
}
