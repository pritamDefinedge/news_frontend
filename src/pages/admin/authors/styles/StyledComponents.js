import { styled } from "@mui/material/styles";
import { Card, Button, Box, IconButton } from "@mui/material";

// StyledCard
export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  overflow: "visible",
  marginBottom: theme.spacing(1),
}));

// FileUploadButton
export const FileUploadButton = styled(Button)(({ theme }) => ({
  height: 120,
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
  textTransform: "none",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

// PreviewBox
export const PreviewBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 120,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  marginTop: theme.spacing(1),
}));

// RemoveButton
export const RemoveButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
}));
