import { FormControl, InputLabel, MenuItem, Select, FormHelperText, alpha } from "@mui/material";
import { Controller } from "react-hook-form";
import React, { memo } from "react";

const FormSelect = memo(({ 
  name, 
  control, 
  label, 
  options, 
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
      <FormControl 
        fullWidth 
        margin="dense" 
        error={!!error || !!fieldError} 
        required={required}
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
          '& .MuiSelect-select': {
            fontSize: '0.875rem',
            padding: '8px 12px',
          },
          '& .MuiFormHelperText-root': {
            margin: '2px 0 0',
            fontSize: '0.75rem',
          }
        }}
      >
        <InputLabel>{label}</InputLabel>
        <Select {...field} {...props} label={label}>
          {options.map((option) => (
            <MenuItem 
              key={option.value} 
              value={option.value}
              sx={{ fontSize: '0.875rem' }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {error?.message || fieldError?.message || helperText || " "}
        </FormHelperText>
      </FormControl>
    )}
  />
));

FormSelect.displayName = 'FormSelect';

export default FormSelect;
