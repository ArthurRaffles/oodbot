import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Title from "../dashboard/title";

import { BoatSelect } from "../boat/boatSelect";
import { ClassHandicap } from "../../contexts/pyContext";
import { EntrantSelect } from "../entrantSelect/entrantSelect";
import { Entrant } from "../../contexts/entrantContext";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  entrantContainer: {
    display: "flex",
  },
  date: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export type EntrantInputProps = {
//  onChange: (entrant: Entrant) => void;
};

export function EntrantInput() {

  const [boat, setBoat] = React.useState<ClassHandicap | null>({
    className: "",
    number: undefined,
  });
  const [entrant, setEntrant] = React.useState<Entrant | null>({
    fullname: ''
  });
  const classes = useStyles();

  // const handleChange: React.EventHandler<any> = (event) => {
  //   console.warn("setting date", event.target.value);
  //   setDate(event.target.value);
  // };
  const handleBoatChange = (boat: ClassHandicap | null) => {
    console.warn("setting boat", boat);
    setBoat(boat);
  };
  const handleEntrantChange = (entrant: Entrant | null) => {
    console.warn("setting entrant", entrant);
    setEntrant(entrant);
  };
  return (
    <React.Fragment>
      <Title>Add entrant</Title>
      <div className={classes.entrantContainer}>
        {/* <TextField
          id="datetime-local"
          label="Start date time"
          type="datetime-local"
          className={classes.date}
          InputLabelProps={{
            shrink: true,
          }}
          value={date}
          onChange={handleChange}
        /> */}
        <BoatSelect onChange={handleBoatChange} value={boat} />
        <EntrantSelect onChange={handleEntrantChange} value={entrant} />
      </div>
    </React.Fragment>
  );
}
