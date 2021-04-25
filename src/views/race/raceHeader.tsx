import React from "react";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Title from "../dashboard/title";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  raceHeader: {
    display: "flex",
  },
  date: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export function RaceHeader() {
  const [date, setDate] = React.useState('');
  const classes = useStyles();

  const handleChange: React.EventHandler<any> = (event) => {
    console.warn('setting date', event.target.value)
    setDate(event.target.value);
  };
  return (
    <React.Fragment>
      <Title>Enter Race Details</Title>
      <div className={classes.raceHeader}>
        <TextField
          id="datetime-local"
          label="Start date time"
          type="datetime-local"
          className={classes.date}
          InputLabelProps={{
            shrink: true,
          }}
          value={date}
          onChange={handleChange}
        
        />
      </div>
    </React.Fragment>
  );
}
