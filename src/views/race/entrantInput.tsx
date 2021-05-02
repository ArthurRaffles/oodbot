import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Title from "../dashboard/title";
import { BoatSelect } from "../boat/boatSelect";
import { EntrantSelect } from "../entrantSelect/entrantSelect";
import { Entrant } from "../../contexts/entrantContext";
import { DateTime } from "luxon";
import { ClassHandicap, RaceEntrant } from "../../model";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  entrantContainer: {
    display: "flex",
    paddingRight: "5px",
  },
  date: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export type EntrantInputProps = {
  onChange: (entrant: RaceEntrant) => void;
};

export function EntrantInput(props: EntrantInputProps) {
  const [boat, setBoat] = React.useState<ClassHandicap | null>(null);
  const [entrant, setEntrant] = React.useState<Entrant | null>();
  const [date, setDate] = React.useState<string>(
    DateTime.now().toFormat("HH:mm:ss")
  );
  const classes = useStyles();

  const handleDateChange: React.EventHandler<any> = (event) => {
    console.warn("setting date", event.target.value);
    if (event.target.value) {
      setDate(event.target.value);
    }
  };
  const handleBoatChange = (boat: ClassHandicap | null) => {
    console.warn("setting boat", boat);
    if (boat) {
      setBoat(boat);
    }
  
  };
  const handleEntrantChange = (entrant: Entrant | null) => {
    console.warn("setting entrant", entrant);
    if (entrant) {
      setEntrant(entrant);
    }
 
  };
  const handleAddRacer = () => {
    const payload: RaceEntrant = RaceEntrant.create(
      entrant?.fullname ?? '',
      boat ?? {className: '', number: 1},
      date
    );
    console.warn("adding racer", payload);
    props.onChange(payload);
    setBoat({className: '', number: 0});
    setEntrant({fullname: ''});
    setDate( DateTime.now().toFormat("HH:mm:ss"));

  };
  return (
    <React.Fragment>
      <Title>Add entrant</Title>
      <div className={classes.entrantContainer}>
        <EntrantSelect onChange={handleEntrantChange} value={entrant} />
        <BoatSelect onChange={handleBoatChange} value={boat} />
        <TextField
          id="datetime-local"
          label="Enter finish time"
          type="time"
          variant="outlined"
          className={classes.date}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 1, // sec
          }}
          value={date}
          onChange={handleDateChange}
        />
        <Button variant="contained" color="primary" onClick={handleAddRacer}>
          Add
        </Button>
      </div>
    </React.Fragment>
  );
}
