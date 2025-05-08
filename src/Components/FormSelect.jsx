import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import React from "react";

const FormSelect = ({ name, control, label, options, required = false, error, helperText }) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({ field }) => (
      <FormControl fullWidth margin="normal" error={!!error} required={required}>
        <InputLabel>{label}</InputLabel>
        <Select {...field} label={label}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    )}
  />
);

export default FormSelect;
