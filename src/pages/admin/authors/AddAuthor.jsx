import React, { useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  CardContent,
  Avatar,
  Divider,
  Chip,
  useTheme,
  CircularProgress,
  Paper,
  alpha
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  CloudUpload as CloudUploadIcon,
  Cancel as CancelIcon,
  AddCircleRounded,
} from "@mui/icons-material";
import FormInput from "../../../Components/FormInput";
import FormSelect from "../../../Components/FormSelect";
import FormActions from "../../../Components/FormActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import {
  StyledCard,
  FileUploadButton,
  PreviewBox,
  RemoveButton,
} from "./styles/StyledComponents";

import {
  createAuthor,
  setAuthorLoading,
} from "../../../redux/actions/author.actions";

// Add validation rules object
const validationRules = {
  firstName: {
    required: "First name is required",
    minLength: {
      value: 2,
      message: "First name must be at least 2 characters",
    },
    maxLength: { value: 50, message: "First name cannot exceed 50 characters" },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "First name can only contain letters and spaces",
    },
  },
  lastName: {
    required: "Last name is required",
    minLength: { value: 2, message: "Last name must be at least 2 characters" },
    maxLength: { value: 50, message: "Last name cannot exceed 50 characters" },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Last name can only contain letters and spaces",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Please enter a valid email address",
    },
  },
  phone: {
    required: "Phone number is required",
    pattern: {
      value: /^\d{10}$/,
      message: "Phone number must be exactly 10 digits",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    maxLength: {
      value: 30,
      message: "Password cannot exceed 30 characters",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  },
  role: {
    required: "Role is required",
  },
  avatar: {
    required: "Avatar is required",
    validate: {
      fileSize: (file) => {
        if (!file?.[0]) return "Avatar is required";
        return (
          file[0].size <= 2 * 1024 * 1024 ||
          "Avatar size should be less than 2MB"
        );
      },
      fileType: (file) => {
        if (!file?.[0]) return "Avatar is required";
        const validTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/svg+xml",
        ];
        return (
          validTypes.includes(file[0].type) ||
          "Avatar must be JPEG, PNG, or GIF"
        );
      },
    },
  },
  coverImage: {
    validate: {
      fileSize: (file) => {
        if (!file?.[0]) return true;
        return (
          file[0].size <= 5 * 1024 * 1024 ||
          "Cover image size should be less than 5MB"
        );
      },
      fileType: (file) => {
        if (!file?.[0]) return true;
        const validTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/svg+xml",
        ];
        return (
          validTypes.includes(file[0].type) ||
          "Cover image must be JPEG, PNG, or GIF"
        );
      },
    },
  },
};

const AddAuthor = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.author);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    register,
    watch,
    setValue,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      role: "author",
      isVerified: true,
      isActive: true,
      avatar: null,
      coverImage: null,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const avatarFile = watch("avatar");
  const coverImageFile = watch("coverImage");

  // On error, show toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // On successful create, notify and navigate
  useEffect(() => {
    if (success) {
      toast.success("Author created successfully!");
      reset();
      dispatch(setAuthorLoading(false));
      navigate("/admin/authors");
    }
  }, [success, reset, navigate, dispatch]);

  // Create object URLs for previews
  const avatarPreviewUrl = useMemo(
    () => (avatarFile?.[0] ? URL.createObjectURL(avatarFile[0]) : null),
    [avatarFile]
  );

  const coverImagePreviewUrl = useMemo(
    () => (coverImageFile?.[0] ? URL.createObjectURL(coverImageFile[0]) : null),
    [coverImageFile]
  );

  // Revoke URLs on cleanup
  useEffect(() => {
    return () => {
      avatarPreviewUrl && URL.revokeObjectURL(avatarPreviewUrl);
      coverImagePreviewUrl && URL.revokeObjectURL(coverImagePreviewUrl);
    };
  }, [avatarPreviewUrl, coverImagePreviewUrl]);

  // Handle file removal
  const handleRemoveFile = useCallback(
    (field) => {
      setValue(field, null);
      const input = document.querySelector(`input[name="${field}"]`);
      if (input) input.value = "";
      trigger(field);
    },
    [setValue, trigger]
  );

  // Cancel/back to list
  const handleCancel = useCallback(() => {
    reset();
    navigate("/admin/authors");
  }, [reset, navigate]);

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const fd = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "string") {
          fd.append(key, value.trim());
        } else if (value instanceof FileList && value[0]) {
          fd.append(key, value[0]);
        } else {
          fd.append(key, value);
        }
      });

      dispatch(createAuthor(fd));
    } catch (error) {
      console.error("Form submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit form. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <>
      <Box sx={{ p: 3 }}>
        <ToastContainer position="top-right" autoClose={5000} />
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            background: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 4px 20px -8px ${alpha(
              theme.palette.primary.main,
              0.1
            )}`,
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  color: "primary.main",
                }}
              >
                Add New Author
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleRounded />}
                onClick={() => navigate("/admin/authors")}
                sx={{
                  textTransform: "none",
                  fontSize: "0.875rem",
                  py: 0.5,
                }}
              >
                Author List
              </Button>
            </Box>

            <Divider sx={{ mb: 1.5 }} />

            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                {/* Personal Information */}
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 500,
                      mb: 0.5,
                      fontSize: "0.95rem",
                      color: "text.secondary",
                    }}
                  >
                    Personal Information
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="firstName"
                    control={control}
                    label="First Name *"
                    rules={validationRules.firstName}
                    error={errors.firstName}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="lastName"
                    control={control}
                    label="Last Name *"
                    rules={validationRules.lastName}
                    error={errors.lastName}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="email"
                    control={control}
                    label="Email *"
                    type="email"
                    rules={validationRules.email}
                    error={errors.email}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="phone"
                    control={control}
                    label="Phone *"
                    type="tel"
                    rules={validationRules.phone}
                    error={errors.phone}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="password"
                    control={control}
                    label="Password *"
                    type="password"
                    rules={validationRules.password}
                    error={errors.password}
                    required
                  />
                </Grid>

                {/* Account Settings */}
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 500, mb: 1 }}
                  >
                    Account Settings
                  </Typography>
                  <Divider />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormSelect
                    name="role"
                    control={control}
                    label="Role *"
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "author", label: "Author" },
                    ]}
                    rules={validationRules.role}
                    error={errors.role}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormSelect
                    name="isVerified"
                    control={control}
                    label="Verification Status"
                    options={[
                      { value: true, label: "Verified" },
                      { value: false, label: "Not Verified" },
                    ]}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormSelect
                    name="isActive"
                    control={control}
                    label="Account Status"
                    options={[
                      { value: true, label: "Active" },
                      { value: false, label: "Inactive" },
                    ]}
                  />
                </Grid>

                {/* Profile Images */}
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 500, mb: 1 }}
                  >
                    Profile Images
                  </Typography>
                  <Divider />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <input
                    type="file"
                    accept="image/*"
                    id="avatar-upload"
                    {...register("avatar", validationRules.avatar)}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="avatar-upload">
                    <FileUploadButton
                      component="span"
                      fullWidth
                      variant="outlined"
                      error={!!errors.avatar}
                    >
                      <CloudUploadIcon fontSize="large" />
                      <Typography>Upload Avatar *</Typography>
                      <Typography variant="caption">
                        (JPEG, PNG, GIF, max 2MB)
                      </Typography>
                    </FileUploadButton>
                  </label>
                  {errors.avatar && (
                    <Typography color="error" variant="caption">
                      {errors.avatar.message}
                    </Typography>
                  )}
                  {avatarPreviewUrl && (
                    <PreviewBox>
                      <Avatar
                        src={avatarPreviewUrl}
                        variant="rounded"
                        sx={{ width: "100%", height: "100%" }}
                      />
                      <RemoveButton
                        size="small"
                        onClick={() => handleRemoveFile("avatar")}
                      >
                        <CancelIcon />
                      </RemoveButton>
                      <Chip
                        label={avatarFile[0].name}
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: theme.spacing(1),
                          left: theme.spacing(1),
                        }}
                      />
                    </PreviewBox>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <input
                    type="file"
                    accept="image/*"
                    id="cover-upload"
                    {...register("coverImage", validationRules.coverImage)}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="cover-upload">
                    <FileUploadButton
                      component="span"
                      fullWidth
                      variant="outlined"
                      error={!!errors.coverImage}
                    >
                      <CloudUploadIcon fontSize="large" />
                      <Typography>Upload Cover Image</Typography>
                      <Typography variant="caption">
                        (JPEG, PNG, GIF, max 5MB)
                      </Typography>
                    </FileUploadButton>
                  </label>
                  {errors.coverImage && (
                    <Typography color="error" variant="caption">
                      {errors.coverImage.message}
                    </Typography>
                  )}
                  {coverImagePreviewUrl && (
                    <PreviewBox>
                      <Box
                        component="img"
                        src={coverImagePreviewUrl}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <RemoveButton
                        size="small"
                        onClick={() => handleRemoveFile("coverImage")}
                      >
                        <CancelIcon />
                      </RemoveButton>
                      <Chip
                        label={coverImageFile[0].name}
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: theme.spacing(1),
                          left: theme.spacing(1),
                        }}
                      />
                    </PreviewBox>
                  )}
                </Grid>

                {/* Form Actions */}
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <FormActions
                    onCancel={handleCancel}
                    isSubmitting={loading}
                    submitText={
                      loading ? <CircularProgress size={20} /> : "Create Author"
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Paper>
      </Box>
    </>
  );
};

export default AddAuthor;
