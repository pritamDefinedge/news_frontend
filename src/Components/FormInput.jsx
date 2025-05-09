import { TextField, alpha } from "@mui/material";
import { Controller } from "react-hook-form";
import React, { memo } from "react";

const FormInput = memo(({ 
  name, 
  control, 
  label, 
  type = "text", 
  required = false, 
  error, 
  helperText,
  rules,
  ...props 
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    defaultValue=""
    render={({ field, fieldState: { error: fieldError } }) => (
      <TextField
        {...field}
        {...props}
        fullWidth
        label={label}
        type={type}
        required={required}
        error={!!error || !!fieldError}
        helperText={error?.message || fieldError?.message || helperText || " "}
        margin="dense"
        variant="outlined"
        size="small"
        sx={{
          mb: 0.5,
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
            backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.6),
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.8),
            },
            '&.Mui-focused': {
              backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '0.875rem',
          },
          '& .MuiOutlinedInput-input': {
            fontSize: '0.875rem',
            padding: '8px 12px',
          },
          '& .MuiFormHelperText-root': {
            margin: '2px 0 0',
            fontSize: '0.75rem',
          }
        }}
      />
    )}
  />
));

FormInput.displayName = 'FormInput';

export default FormInput;
