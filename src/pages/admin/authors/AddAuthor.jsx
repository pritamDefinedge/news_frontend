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
  useMediaQuery,
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
import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUser } from "../../../redux/actions/user.actions";

import {
  StyledCard,
  FileUploadButton,
  PreviewBox,
  RemoveButton,
} from "./styles/StyledComponents";

const AddUserForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  const {
    handleSubmit,
    control,
    formState: { errors },
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
    mode: "onSubmit",
  });

  const avatarFile = watch("avatar");
  const coverImageFile = watch("coverImage");

  // Memoize validation rules to prevent unnecessary re-renders
  const validationRules = useMemo(() => ({
    firstName: {
      required: "First name is required",
      minLength: {
        value: 2,
        message: "Minimum 2 characters required",
      },
      maxLength: {
        value: 50,
        message: "Maximum 50 characters allowed",
      },
      pattern: {
        value: /^[A-Za-z\s]+$/,
        message: "Only letters and spaces are allowed",
      },
    },
    lastName: {
      required: "Last name is required",
      minLength: {
        value: 2,
        message: "Minimum 2 characters required",
      },
      maxLength: {
        value: 50,
        message: "Maximum 50 characters allowed",
      },
      pattern: {
        value: /^[A-Za-z\s]+$/,
        message: "Only letters and spaces are allowed",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    phone: {
      required: "Phone number is required",
      pattern: {
        value: /^\d{10}$/,
        message: "Phone must be 10 digits",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Minimum 8 characters required",
      },
      maxLength: {
        value: 30,
        message: "Maximum 30 characters allowed",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: "Must contain uppercase, lowercase, number, and special character",
      },
    },
    role: {
      required: "Role is required",
    },
    avatar: {
      validate: (file) => validateFile(file, true, 2),
    },
    coverImage: {
      validate: (file) => validateFile(file, false, 5),
    },
  }), []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Memoize file validation function
  const validateFile = useCallback((file, isRequired = true, maxSizeMB = 5) => {
    if (!file?.[0]) {
      return isRequired ? "This field is required" : true;
    }

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    
    if (!validTypes.includes(file[0].type)) {
      return "Only JPEG, PNG, GIF, WEBP, or SVG images are allowed";
    }

    if (file[0].size > maxSizeMB * 1024 * 1024) {
      return `Image size must be less than ${maxSizeMB}MB`;
    }

    return true;
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName.trim());
      formData.append("lastName", data.lastName.trim());
      formData.append("email", data.email.trim());
      formData.append("phone", data.phone.trim());
      formData.append("password", data.password);
      formData.append("role", data.role);
      formData.append("isVerified", data.isVerified);
      formData.append("isActive", data.isActive);

      if (data.avatar?.[0]) {
        formData.append("avatar", data.avatar[0]);
      }

      if (data.coverImage?.[0]) {
        formData.append("coverImage", data.coverImage[0]);
      }

      const result = await dispatch(createUser(formData));
      if (!result.error) {
        toast.success("User created successfully!");
        reset();
        navigate("/admin/authors");
      }
    } catch (err) {
      console.error("Error creating user:", err);
      toast.error(err.message || "Failed to create user");
    }
  };

  const handleCancel = useCallback(() => {
    reset();
    navigate("/admin/authors");
  }, [navigate, reset]);

  const handleRemoveFile = useCallback((fieldName) => {
    setValue(fieldName, null);
    const fileInput = document.querySelector(`input[name="${fieldName}"]`);
    if (fileInput) fileInput.value = "";
  }, [setValue]);

  const handleUserList = useCallback(() => {
    navigate("/admin/authors");
  }, [navigate]);

  // Memoize preview URLs to prevent unnecessary re-renders
  const avatarPreviewUrl = useMemo(() => 
    avatarFile?.[0] ? URL.createObjectURL(avatarFile[0]) : null,
    [avatarFile]
  );

  const coverImagePreviewUrl = useMemo(() => 
    coverImageFile?.[0] ? URL.createObjectURL(coverImageFile[0]) : null,
    [coverImageFile]
  );

  // Cleanup object URLs when component unmounts or files change
  useEffect(() => {
    return () => {
      if (avatarPreviewUrl) URL.revokeObjectURL(avatarPreviewUrl);
      if (coverImagePreviewUrl) URL.revokeObjectURL(coverImagePreviewUrl);
    };
  }, [avatarPreviewUrl, coverImagePreviewUrl]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <StyledCard>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Add New Author
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleRounded />}
              onClick={handleUserList}
            >
              Author List
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 0 }}
          >
            <Grid container spacing={2}>
              {/* Personal Information */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                  Personal Information
                </Typography>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormInput
                  name="firstName"
                  control={control}
                  label="First Name *"
                  rules={validationRules.firstName}
                  error={Boolean(errors.firstName)} 
                  helperText={errors.firstName?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormInput
                  name="lastName"
                  control={control}
                  label="Last Name *"
                  rules={validationRules.lastName}
                  error={Boolean(errors.lastName)} 
                  helperText={errors.lastName?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormInput
                  name="email"
                  control={control}
                  label="Email *"
                  type="email"
                  rules={validationRules.email}
                  error={Boolean(errors.email)} 
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormInput
                  name="phone"
                  control={control}
                  label="Phone *"
                  type="tel"
                  rules={validationRules.phone}
                  error={Boolean(errors.phone)} 
                  helperText={errors.phone?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormInput
                  name="password"
                  control={control}
                  label="Password *"
                  type="password"
                  rules={validationRules.password}
                  error={Boolean(errors.password)} 
                  helperText={errors.password?.message}
                />
              </Grid>

              {/* Account Settings */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
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
                  error={Boolean(errors.role)} 
                  helperText={errors.role?.message}
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
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
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
                    <Typography variant="body2">Upload Avatar *</Typography>
                    <Typography variant="caption" color="textSecondary">
                      (JPEG, PNG, GIF, max 2MB)
                    </Typography>
                  </FileUploadButton>
                </label>
                {errors.avatar && (
                  <Typography variant="caption" color="error">
                    {errors.avatar.message}
                  </Typography>
                )}

                {avatarPreviewUrl && (
                  <PreviewBox>
                    <Avatar
                      src={avatarPreviewUrl}
                      sx={{ width: "100%", height: "100%", borderRadius: 1 }}
                      variant="rounded"
                    />
                    <RemoveButton
                      size="small"
                      onClick={() => handleRemoveFile("avatar")}
                    >
                      <CancelIcon fontSize="small" />
                    </RemoveButton>
                    <Chip
                      label={avatarFile[0].name}
                      size="small"
                      sx={{
                        position: "absolute",
                        bottom: theme.spacing(1),
                        left: theme.spacing(1),
                        maxWidth: "calc(100% - 32px)",
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
                    <Typography variant="body2">Upload Cover Image</Typography>
                    <Typography variant="caption" color="textSecondary">
                      (JPEG, PNG, GIF, max 5MB)
                    </Typography>
                  </FileUploadButton>
                </label>
                {errors.coverImage && (
                  <Typography variant="caption" color="error">
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
                      <CancelIcon fontSize="small" />
                    </RemoveButton>
                    <Chip
                      label={coverImageFile[0].name}
                      size="small"
                      sx={{
                        position: "absolute",
                        bottom: theme.spacing(1),
                        left: theme.spacing(1),
                        maxWidth: "calc(100% - 32px)",
                      }}
                    />
                  </PreviewBox>
                )}
              </Grid>

              {/* Form Actions */}
              <Grid item xs={12}>
                <FormActions
                  onCancel={handleCancel}
                  isSubmitting={loading}
                  submitText="Create Author"
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </StyledCard>
    </>
  );
};

export default AddUserForm;