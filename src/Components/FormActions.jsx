import { Button, Stack, CircularProgress, Typography } from "@mui/material";
import { Cancel as CancelIcon, Send as SendIcon } from "@mui/icons-material";
import React from "react";

const FormActions = ({ onCancel, isSubmitting }) => (
  <Stack
    direction="row"
    justifyContent="flex-end"
    spacing={2}
    mt={2}
    sx={{ position: "relative" }}
  >
    <Button
      onClick={onCancel}
      variant="outlined"
      color="error"
      startIcon={<CancelIcon />}
      sx={{
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#f8d7da",
        },
      }}
    >
      <Typography variant="button">Cancel</Typography>
    </Button>

    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={isSubmitting}
      startIcon={isSubmitting ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
      sx={{
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#0044cc",
        },
      }}
    >
      <Typography variant="button">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Typography>
    </Button>
  </Stack>
);

export default FormActions;
