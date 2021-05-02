import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RaceHeader } from "./raceHeader";
import { EntrantInput } from "./entrantInput";
import { RaceContext } from "../../contexts";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "200px",
  },
}));

export function Race() {
  const classes = useStyles();
  const { addRacer, createRace, selectedRace } = useContext(RaceContext);
  return (
    <div className={classes.container}>
      <RaceHeader
        createRace={(name, start) => createRace(name, start)}
        race={selectedRace}
      />
      <EntrantInput
        onChange={(entrant) => addRacer(entrant, selectedRace?.id)}
      />
    </div>
  );
}
