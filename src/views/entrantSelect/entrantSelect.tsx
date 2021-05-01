import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Entrant, useEntrantContext } from "../../contexts";

export type EntrantSelectProps = {
  value: Entrant | null;
  onChange: (entrant: Entrant | null) => void;
};

export const EntrantSelect: React.FC<EntrantSelectProps> = ({
  onChange,
  value,
}) => {
  const { getEntrantList, saveEntrant } = useEntrantContext();
  const options = getEntrantList();

  return (
    <React.Fragment>
      <Autocomplete
        freeSolo
        value={value}
        onChange={(event: any, entrant: Entrant | string | null) => {
          if (typeof entrant === "string") {
            saveEntrant({ fullname: entrant });
            onChange({ fullname: entrant });
          } else {
            onChange(entrant);
          }
        }}
        id="entrant-select"
        options={options as Entrant[]}
        style={{ width: 300 }}
        renderInput={(params: any) => (
          <TextField {...params} label="Enter racer name" variant="outlined" />
        )}
        getOptionLabel={(option) => {
          if (!option.fullname) {
            return "";
          }
          return option.fullname;
        }}
        renderOption={(option: Entrant) => (
          <React.Fragment>{option.fullname}</React.Fragment>
        )}
      />
    </React.Fragment>
  );
};
