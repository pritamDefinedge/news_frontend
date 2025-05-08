import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import React from "react";

const FormInput = ({ name, control, label, type = "text", required = false, error, helperText }) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({ field }) => (
      <TextField
        {...field}
        fullWidth
        label={label}
        type={type}
        required={required}
        error={!!error}
        helperText={error ? helperText : null}
        margin="normal"
      />
    )}
  />
);

export default FormInput;
