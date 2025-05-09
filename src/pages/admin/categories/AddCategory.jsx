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
  alpha,
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
  createCategory,
  setLoading,
} from "../../../redux/actions/category.actions";

// Add validation rules object
const validationRules = {
  title: {
    required: "Title is required",
    minLength: {
      value: 2,
      message: "Title must be at least 2 characters",
    },
    maxLength: { value: 50, message: "Title cannot exceed 50 characters" },
  },
  order: {
    required: "Order is required",
    pattern: {
      value: /^[0-9]+$/,
      message: "Order must be a number",
    },
  },
  isActive: {
    required: "Status is required",
  },
  image: {
    required: "Image is required",
    validate: {
      fileSize: (file) => {
        if (!file?.[0]) return "Image is required";
        return (
          file[0].size <= 2 * 1024 * 1024 ||
          "Image size should be less than 2MB"
        );
      },
      fileType: (file) => {
        if (!file?.[0]) return "Image is required";
        const validTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/svg+xml",
        ];
        return (
          validTypes.includes(file[0].type) ||
          "Image must be JPEG, PNG, Webp, svg or GIF "
        );
      },
    },
  },
};

const AddCategory = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.category);

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
      title: "",
      order: "",
      isActive: true,
      image: null,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const imageFile = watch("image");

  // On error, show toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // On successful create, notify and navigate
  useEffect(() => {
    if (success) {
      toast.success("Category created successfully!");
      reset();
      dispatch(setLoading(false));
      navigate("/admin/category");
    }
  }, [success, reset, navigate, dispatch]);

  // Create object URL for preview
  const imagePreviewUrl = useMemo(
    () => (imageFile?.[0] ? URL.createObjectURL(imageFile[0]) : null),
    [imageFile]
  );

  // Revoke URL on cleanup
  useEffect(() => {
    return () => {
      imagePreviewUrl && URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

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
    navigate("/admin/category");
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

      dispatch(createCategory(fd));
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
                Add New Category
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleRounded />}
                onClick={() => navigate("/admin/category")}
                sx={{
                  textTransform: "none",
                  fontSize: "0.875rem",
                  py: 0.5,
                }}
              >
                Category List
              </Button>
            </Box>

            <Divider sx={{ mb: 1.5 }} />

            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="title"
                    control={control}
                    label="Title *"
                    rules={validationRules.title}
                    error={errors.title}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="order"
                    control={control}
                    label="Order *"
                    type="number"
                    rules={validationRules.order}
                    error={errors.order}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
              
                  <FormSelect
                    name="isActive"
                    control={control}
                    label=" Status *"
                    options={[
                      { value: true, label: "Active" },
                      { value: false, label: "Inactive" },
                    ]}
                  />
                </Grid>

                <Grid item xs={12}>
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    {...register("image", validationRules.image)}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="image-upload">
                    <FileUploadButton
                      component="span"
                      fullWidth
                      variant="outlined"
                      error={!!errors.image}
                    >
                      <CloudUploadIcon fontSize="large" />
                      <Typography>Upload Category Image *</Typography>
                      <Typography variant="caption">
                        (JPEG, PNG, GIF, max 2MB)
                      </Typography>
                    </FileUploadButton>
                  </label>
                  {errors.image && (
                    <Typography color="error" variant="caption">
                      {errors.image.message}
                    </Typography>
                  )}
                  {imagePreviewUrl && (
                    <PreviewBox>
                      <Avatar
                        src={imagePreviewUrl}
                        variant="rounded"
                        sx={{ width: "100%", height: "100%" }}
                      />
                      <RemoveButton
                        size="small"
                        onClick={() => handleRemoveFile("image")}
                      >
                        <CancelIcon />
                      </RemoveButton>
                      <Chip
                        label={imageFile[0].name}
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

                <Grid item xs={12} sx={{ mt: 1 }}>
                  <FormActions
                    onCancel={handleCancel}
                    isSubmitting={loading}
                    submitText={
                      loading ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Create Category"
                      )
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

export default AddCategory;
