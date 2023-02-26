import React, { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function AutoCompleteField({
  value,
  options,
  setOptionLabel,
  defaultValue,
  setValue,
  label,
  sx,
}) {

  return (
    <Autocomplete
      value={value}
      id="combo-box-demo"
      options={options}
      // value={defaultValue}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      isOptionEqualToValue={(option, value) => (option = value)}
      getOptionLabel={setOptionLabel}
      sx={sx}
      renderInput={(params) => <TextField {...params} label={label} fullWidth/>}
    />
  );
}
