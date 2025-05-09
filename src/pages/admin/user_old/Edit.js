import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import List from "@mui/icons-material/List";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserById,
  updateUser,
} from "../../../redux/actions/user.actions";
import Swal from "sweetalert2";

const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  type = "text",
  onKeyDown,
  onInput,
}) => (
  <TextField
    label={label}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onInput={onInput}
    error={!!error}
    helperText={helperText}
    variant="outlined"
    fullWidth
  />
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <FormControl fullWidth variant="outlined">
    <Select name={name} value={value} onChange={onChange} displayEmpty>
      <MenuItem value="" disabled>
        {label}
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedUser, success, error, loading } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [submitText, setSubmitText] = useState("Update");

  const validators = {
    firstName: (value) =>
      /^[A-Za-z\s]+$/.test(value) ||
      "First Name should contain only letters and spaces",
    lastName: (value) =>
      /^[A-Za-z\s]+$/.test(value) ||
      "Last Name should contain only letters and spaces",
    email: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email address",
    phone: (value) =>
      /^\d{10}$/.test(value) || "Phone Number must be exactly 10 digits",
  };

  // Fetch user details if editing
  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  // Populate form data once selectedUser is available
  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validators[name]) {
      const error = validators[name](value);
      setErrors((prev) => ({
        ...prev,
        [name]: error === true ? "" : error,
      }));
    }
  };

  const handleNumericInput = (e) => {
    const isNumberKey = e.key >= "0" && e.key <= "9";
    const isControlKey = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
    ].includes(e.key);
    if (!isNumberKey && !isControlKey) {
      e.preventDefault();
    }
  };

  const handleMaxLength = (e) => {
    if (e.target.value.length > 9) {
      e.target.value = e.target.value.slice(0, 10);
    }
  };

  // Handle Validation on Submit
  const validateForm = () => {
    const validationErrors = {};
    Object.keys(validators).forEach((key) => {
      const value = formData[key];
      const error = validators[key](value);
      if (error !== true) validationErrors[key] = error;
    });
    return validationErrors;
  };

  // Handle Form Submission
  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(updateUser(id, formData));
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (success) {
      Swal.fire("Success!", "User updated successfully.", "success");
      setTimeout(() => {
        navigate("/users");
      }, 1500);
    } else if (error) {
      Swal.fire("Error!", "Failed to update user.", "error");
    }
  }, [success, error, navigate]);

  const handleReset = () => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
    setErrors({});
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6">Edit User</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/users")}
            startIcon={<List />}
          >
            Display Users
          </Button>
        </Box>
      </Grid>

      <Grid container spacing={2}>
        {[...Object.keys(validators)].map((name) => {
          const label =
            name.charAt(0).toUpperCase() +
            name.slice(1).replace(/([A-Z])/g, " $1");
          return (
            <Grid item lg={6} key={name}>
              <InputField
                label={label}
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                onInput={name === "phone" ? handleMaxLength : undefined}
                onKeyDown={name === "phone" ? handleNumericInput : undefined}
                error={errors[name]}
                helperText={errors[name]}
              />
            </Grid>
          );
        })}

        {/* Gender Select */}
        <Grid item lg={6}>
          <SelectField
            label="Select Gender"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
          />
        </Grid>

        {/* Status Checkbox */}
        <Grid item lg={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Status</FormLabel>
            <FormGroup row>
              {["Active", "Blocked"].map((status) => (
                <FormControlLabel
                  key={status}
                  control={
                    <Checkbox
                      checked={formData.status === status}
                      onChange={() =>
                        setFormData((prev) => ({ ...prev, status }))
                      }
                    />
                  }
                  label={status}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid
          item
          lg={12}
          sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ mr: 2 }}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {submitText}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Edit;
