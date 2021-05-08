import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RaceHeader } from "./raceHeader";
import { EntrantInput } from "./entrantInput";
import { RaceContext } from "../../contexts";
import {
  useLocation
} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "200px",
  },
}));
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export function Race() {
  const classes = useStyles();
  const { addRacer, selectedRace, saveRace, createRace, selectRace } = useContext(
    RaceContext
  );
  const query = useQuery();
  const queries = new Map(query.entries());
  const raceId = queries.get('id');

  // let race;
  if (raceId) {
    selectRace(raceId);
    
  }

  const theRace = selectedRace;
  console.warn('query', raceId, theRace);
  return (
    <div className={classes.container}>
      <RaceHeader
        saveRace={saveRace}
        race={theRace}
        createRace={createRace}
      />
      {!!theRace && (
        <EntrantInput
          onChange={(entrant) => addRacer(entrant, theRace?.id)}
        />
      )}
    </div>
  );
}
