import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Title from "../dashboard/title";
import { Race } from "../../model";
import Button from "@material-ui/core/Button";

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

export type RaceHeaderProps = {
  race?: Race | null;
  createRace(name: string, start: string): void;
};
export function RaceHeader({ race, createRace }: RaceHeaderProps) {
  const [date, setDate] = React.useState(
    "2020-03-21T14:00"
    // DateTime.now().endOf("hour").minus(1).toFormat('yyyy-MM-ddThh:mm')
  );
  const [name, setName] = React.useState("");
  const classes = useStyles();

  const handleDateChange: React.EventHandler<any> = (event) => {
    console.warn("setting date", event.target.value);
    setDate(event.target.value);
  };
  const handleNameChange: React.EventHandler<any> = (event) => {
    console.warn("setting name", event.target.value);
    setName(event.target.value);
  };

  const handleCreate = () => {
    createRace(name, date);
  };
  useEffect(() => {
    console.warn("effect in header ", race);
    if (race) {
      const { name, start } = race;
      if (start) {
        setDate(start);
      }
      if (name) {
        setName(name);
      }
    }
  }, [race]);

  const isDisabled = !!race;
  console.warn("race date", date, name);
  return (
    <React.Fragment>
      <Title>Enter Race Details</Title>
      <div className={classes.raceHeader}>
        <TextField
          id="datetime-local"
          label="Race Start"
          variant="outlined"
          type="datetime-local"
          className={classes.date}
          InputLabelProps={{
            shrink: true,
          }}
          disabled={isDisabled}
          value={date}
          onChange={handleDateChange}
        />
        <TextField
          id="outlined-basic"
          label="Race Name"
          variant="outlined"
          value={name}
          disabled={isDisabled}
          onChange={handleNameChange}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={isDisabled}
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>
    </React.Fragment>
  );
}
