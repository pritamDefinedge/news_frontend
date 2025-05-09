import React, { useState } from "react";
import {
  Grid,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  Divider,
  Fade,
  Zoom,
  Box,
  Card,
  Chip,
  Button,
  Avatar,
} from "@mui/material";
import {
  Edit,
  Delete,
  Cancel,
  CheckCircle,
  MoreVert,
  Email,
  Phone,
  CalendarToday,
  AdminPanelSettings,
  VerifiedUser,
} from "@mui/icons-material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.shadows[1],
  transition: "all 0.3s ease",
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `0 12px 24px -8px ${alpha(theme.palette.primary.main, 0.2)}`,
    borderColor: alpha(theme.palette.primary.main, 0.3),
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor:
    status === "Active"
      ? alpha(theme.palette.success.main, 0.1)
      : alpha(theme.palette.error.main, 0.1),
  color:
    status === "Active" ? theme.palette.success.main : theme.palette.error.main,
  fontWeight: 600,
  border: `1px solid ${
    status === "Active" ? theme.palette.success.main : theme.palette.error.main
  }`,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  minWidth: "auto",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius * 2,
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const AnimatedAvatar = styled(Avatar)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1) rotate(5deg)",
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

const UserCard = ({ user, onEdit, onDelete, onBlock, onViewProfile }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <StyledCard
        onClick={() => onViewProfile(user)}
        sx={{ cursor: "pointer" }}
      >
        <CardContent sx={{ pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              position: "relative",
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Tooltip title={user.isActive ? "Active" : "Inactive"} arrow>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      bgcolor: user.isActive
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                      border: `2px solid ${theme.palette.background.paper}`,
                      boxShadow: `0 0 0 2px ${
                        user.isActive
                          ? alpha(theme.palette.success.main, 0.3)
                          : alpha(theme.palette.error.main, 0.3)
                      }`,
                    }}
                  />
                </Tooltip>
              }
            >
              <AnimatedAvatar
                alt={`${user.firstName} ${user.lastName}`}
                src={user.avatar || "/default-avatar.png"}
                sx={{
                  width: 90,
                  height: 90,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              />
            </Badge>
          </Box>

          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}{" "}
            {user.lastName}
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}
          >
            <StatusChip
              label={user.isActive ? "Active" : "Inactive"}
              status={user.isActive ? "Active" : "Inactive"}
              size="small"
            />
            <Chip
              icon={
                user.role === "admin" ? (
                  <AdminPanelSettings fontSize="small" />
                ) : (
                  <VerifiedUser fontSize="small" />
                )
              }
              label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              color={user.role === "admin" ? "secondary" : "primary"}
              variant="outlined"
              size="small"
            />
            <Chip
              icon={
                user.isVerified ? (
                  <VerifiedUser fontSize="small" />
                ) : (
                  <Cancel fontSize="small" />
                )
              }
              label={user.isVerified ? "Verified" : "Unverified"}
              color={user.isVerified ? "primary" : "error"}
              variant="outlined"
              size="small"
            />
          </Box>

          <Box
            sx={{
              background: alpha(theme.palette.background.default, 0.5),
              borderRadius: 2,
              p: 2,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Email color="action" sx={{ mr: 1, fontSize: 18 }} />
              <Typography variant="body2" color="text.secondary" noWrap>
                {user.email}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Phone color="action" sx={{ mr: 1, fontSize: 18 }} />
              <Typography variant="body2" color="text.secondary">
                {user.phone || "N/A"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CalendarToday color="action" sx={{ mr: 1, fontSize: 18 }} />
              <Typography variant="caption" color="text.secondary">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <Divider
          sx={{
            my: 1,
            background: `linear-gradient(90deg, transparent, ${alpha(
              theme.palette.primary.main,
              0.3
            )}, transparent)`,
            height: "1px",
          }}
        />

        <CardActions sx={{ justifyContent: "center", p: 1 }}>
          {isMobile ? (
            <>
              <IconButton
                aria-label="more actions"
                onClick={handleMenuOpen}
                sx={{
                  "&:hover": {
                    transform: "scale(1.2)",
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onClick={(e) => e.stopPropagation()}
                TransitionComponent={Fade}
              >
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(user);
                    handleMenuClose();
                  }}
                >
                  <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(user);
                    handleMenuClose();
                  }}
                >
                  <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onBlock(user);
                    handleMenuClose();
                  }}
                >
                  {user.isActive ? (
                    <>
                      <Cancel fontSize="small" sx={{ mr: 1 }} /> Block
                    </>
                  ) : (
                    <>
                      <CheckCircle fontSize="small" sx={{ mr: 1 }} /> Unblock
                    </>
                  )}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Tooltip title="Edit" arrow TransitionComponent={Zoom}>
                <ActionButton
                  aria-label="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(user);
                  }}
                  sx={{ color: theme.palette.info.main }}
                >
                  <Edit fontSize="small" />
                </ActionButton>
              </Tooltip>
              <Tooltip title="Delete" arrow TransitionComponent={Zoom}>
                <ActionButton
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(user);
                  }}
                  sx={{ color: theme.palette.error.main }}
                >
                  <Delete fontSize="small" />
                </ActionButton>
              </Tooltip>
              <Tooltip
                title={user.isActive ? "Block" : "Unblock"}
                arrow
                TransitionComponent={Zoom}
              >
                <ActionButton
                  aria-label={user.isActive ? "block" : "unblock"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onBlock(user);
                  }}
                  sx={{
                    color: user.isActive
                      ? theme.palette.warning.main
                      : theme.palette.success.main,
                  }}
                >
                  {user.isActive ? (
                    <Cancel fontSize="small" />
                  ) : (
                    <CheckCircle fontSize="small" />
                  )}
                </ActionButton>
              </Tooltip>
            </>
          )}
        </CardActions>
      </StyledCard>
    </Grid>
  );
};

export default UserCard;
