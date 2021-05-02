import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { usePyContext } from "../../contexts/pyContext";
import { ClassHandicap } from "../../model";
// import { FilterOptionsState } from "@material-ui/lab";

export type BoatType = {
  boatClass: string | null;
  pyNumber?: number;
};
export type BoatSelectProps = {
  value: ClassHandicap | null;
  onChange: (boat: ClassHandicap | null) => void;
};

export const BoatSelect: React.FC<BoatSelectProps> = ({ onChange, value }) => {
  const { getClassList } = usePyContext();
  const options = getClassList();

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event: any, boatClass: ClassHandicap | null) => {
          onChange(boatClass);
        }}
        id="boat-select"
        options={options as ClassHandicap[]}
        style={{ width: 300 }}
        renderInput={(params: any) => (
          <TextField {...params} label="Select Boat" variant="outlined" />
        )}
        getOptionLabel={(option) =>
          `${option.className} ${option.number ? `(${option.number})` : ""}`
        }
        renderOption={(option: ClassHandicap) => (
          <React.Fragment>
            {option.className} ({option.number})
          </React.Fragment>
        )}
        // filterOptions={(
        //   options: ClassHandicap[],
        //   state: FilterOptionsState<any>
        // ) => {
        //   return options.filter((opt) =>
        //     opt.className.includes(state.inputValue)
        //   );
        // }}
        // getOptionSelected={(option: ClassHandicap, value: ClassHandicap) =>
        //   option.className === value.className
        // }
      />
    </React.Fragment>
  );
};
