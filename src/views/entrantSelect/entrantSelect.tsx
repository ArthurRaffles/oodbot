import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Entrant, useEntrantContext } from "../../contexts";

export type EntrantSelectProps = {
  value?: Entrant | null;
  onChange: (entrant: Entrant) => void;
};

export const EntrantSelect: React.FC<EntrantSelectProps> = ({
  onChange,
  value = {fullname: ''},
}) => {
  const { getEntrantList, saveEntrant } = useEntrantContext();
  const options = getEntrantList();

  const handleChange = (event: any, entrant: Entrant | string | null) => {
    console.warn('entrant select', entrant);
    if (typeof entrant === "string") {
      saveEntrant({ fullname: entrant });
      onChange({ fullname: entrant });
    } else {
      onChange(entrant  ?? {fullname: ''});
    }
  };
  return (
    <React.Fragment>
      <Autocomplete
        freeSolo
        value={value}
        onChange={handleChange}
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
        autoSelect
      />
    </React.Fragment>
  );
};
