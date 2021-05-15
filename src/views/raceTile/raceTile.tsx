import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { RaceInput } from "../race";
import RaceResultsView from "../raceResults/raceResultsView";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectedRace,
  setSelectedRace,
  fetchRace
} from "../../store/raceState";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export const EditRaceTile = React.memo(() => {
  const query = useQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const queries = new Map(query.entries());
    const raceId = queries.get("id");
    console.warn("query string", raceId);

    if (raceId) {
      dispatch(fetchRace(raceId));
    }
  }, [dispatch, query]);
  return <RaceTile />;
});

export const RaceTile = React.memo(() => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const race = useAppSelector(selectedRace);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <RaceInput race={race} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}></Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <RaceResultsView />
        </Paper>
      </Grid>
    </Grid>
  );
});
