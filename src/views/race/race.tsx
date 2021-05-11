import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RaceHeader } from "./raceHeader";
import { EntrantInput } from "./entrantInput";
import { RaceContext } from "../../contexts";
import {
  useLocation
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectedRace, setSelected, createRace, addRacer, saveRace } from "../../store/raceState";
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
  const dispatch = useAppDispatch();
 

  // const { addRacer, selectedRace, saveRace, createRace, selectRace } = useContext(
  //   RaceContext
  // );
  const query = useQuery();
  const queries = new Map(query.entries());
  const raceId = queries.get('id');
  if (raceId) {
    dispatch(setSelected(raceId))
    
  }
  const race = useAppSelector(selectedRace);
  // let race;
  // if (raceId) {
  //   selectRace(raceId);
  // }

  // const theRace = selectedRace;
  console.warn('query', raceId, raceId);
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
