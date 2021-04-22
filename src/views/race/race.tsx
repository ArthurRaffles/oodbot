import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";

import { RaceHeader } from "./raceHeader";

const useStyles = makeStyles((theme) => ({

  container: {
    display: "flex",
    flexDirection: "column",
    width: '100%',
    height: '200px'
  },

}));

export function Race() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <RaceHeader />
    </div>
  );
}
