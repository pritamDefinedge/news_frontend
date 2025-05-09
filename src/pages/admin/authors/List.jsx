import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  useTheme,
  Paper,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Pagination,
  Tooltip,
} from "@mui/material";
import {
  AddCircleRounded,
  Search,
  Sort,
  Refresh,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthors,
  deleteAuthor,
  updateAuthorStatus,
} from "../../../redux/actions/author.actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import UserCard from "./UserCard";

// Enhanced Styled Components

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

// Main List Component with Enhanced Design
const UserList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    role: "",
    isActive: "",
    isVerified: "",
    page: 1,
    limit: 8,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { authors, loading, error, totalCount } = useSelector(
    (state) => state.author
  );

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  // Handle sort
  const handleSort = (field) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder:
        prev.sortBy === field && prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  // Handle pagination
  const handlePageChange = (event, value) => {
    setFilters((prev) => ({
      ...prev,
      page: value,
    }));
  };

  // Handle refresh
  const handleRefresh = () => {
    dispatch(
      getAuthors({
        ...filters,
        search: searchTerm.trim(),
      })
    );
  };

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const queryParams = {
        ...filters,
        search: searchTerm.trim(),
      };

      // Remove empty string values for boolean filters
      if (queryParams.isActive === "") delete queryParams.isActive;
      if (queryParams.isVerified === "") delete queryParams.isVerified;
      if (queryParams.role === "") delete queryParams.role;

      dispatch(getAuthors(queryParams));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, filters, dispatch]);

  // Initial load
  useEffect(() => {
    dispatch(getAuthors({}));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleEdit = (user) => {
    navigate(`/admin/author/edit/${user._id}`);
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: theme.palette.error.main,
      cancelButtonColor: theme.palette.text.disabled,
      confirmButtonText: "Yes, delete it!",
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAuthor(user._id));
      }
    });
  };

  const handleBlock = (user) => {
    Swal.fire({
      title: `Are you sure you want to ${
        user.isActive ? "block" : "unblock"
      } this user?`,
      text: "You can change this later.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: user.isActive
        ? theme.palette.warning.main
        : theme.palette.success.main,
      cancelButtonColor: theme.palette.text.disabled,
      confirmButtonText: `Yes, ${user.isActive ? "block" : "unblock"} it!`,
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateAuthorStatus(user._id, { isActive: !user.isActive }));
      }
    });
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleAddUser = () => {
    navigate("/admin/author/add");
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme={theme.palette.mode}
      />

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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Author Management
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <TextField
              size="small"
              placeholder="Search authors..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 3,
                  background: alpha(theme.palette.background.default, 0.5),
                },
              }}
              sx={{
                width: { xs: "100%", sm: 240 },
              }}
              value={searchTerm}
              onChange={handleSearch}
            />

            <Tooltip title="Refresh" arrow>
              <IconButton
                onClick={handleRefresh}
                sx={{
                  borderRadius: 3,
                  background: alpha(theme.palette.primary.main, 0.1),
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                <Refresh />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleRounded />}
              onClick={handleAddUser}
              sx={{
                borderRadius: 3,
                boxShadow: `0 4px 12px -4px ${alpha(
                  theme.palette.primary.main,
                  0.3
                )}`,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 6px 16px -4px ${alpha(
                    theme.palette.primary.main,
                    0.4
                  )}`,
                },
              }}
            >
              Add Author
            </Button>
          </Stack>
        </Box>

        {/* Filter and Sort Section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mt: 3,
            alignItems: "center",
          }}
        >
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={filters.role}
              label="Role"
              onChange={(e) => handleFilterChange("role", e.target.value)}
              sx={{
                borderRadius: 3,
                background: alpha(theme.palette.background.default, 0.5),
              }}
            >
              <MenuItem value="">All Roles</MenuItem>
              <MenuItem value="author">Author</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.isActive}
              label="Status"
              onChange={(e) => handleFilterChange("isActive", e.target.value)}
              sx={{
                borderRadius: 3,
                background: alpha(theme.palette.background.default, 0.5),
              }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Verified</InputLabel>
            <Select
              value={filters.isVerified}
              label="Verified"
              onChange={(e) => handleFilterChange("isVerified", e.target.value)}
              sx={{
                borderRadius: 3,
                background: alpha(theme.palette.background.default, 0.5),
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Verified</MenuItem>
              <MenuItem value="false">Unverified</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
            <Tooltip title="Sort by Date" arrow>
              <Button
                size="small"
                startIcon={<Sort />}
                onClick={() => handleSort("createdAt")}
                color={filters.sortBy === "createdAt" ? "primary" : "inherit"}
                sx={{
                  borderRadius: 3,
                  padding: "6px 12px",
                  background:
                    filters.sortBy === "createdAt"
                      ? alpha(theme.palette.primary.main, 0.1)
                      : "transparent",
                }}
              >
                Date{" "}
                {filters.sortBy === "createdAt" &&
                  (filters.sortOrder === "asc" ? "↑" : "↓")}
              </Button>
            </Tooltip>

            <Tooltip title="Sort by Name" arrow>
              <Button
                size="small"
                startIcon={<Sort />}
                onClick={() => handleSort("firstName")}
                color={filters.sortBy === "firstName" ? "primary" : "inherit"}
                sx={{
                  padding: "6px 12px",
                  borderRadius: 3,
                  background:
                    filters.sortBy === "firstName"
                      ? alpha(theme.palette.primary.main, 0.1)
                      : "transparent",
                }}
              >
                Name {" "}
                {filters.sortBy === "firstName" &&
                  (filters.sortOrder === "asc" ? "↑" : "↓")}
              </Button>
            </Tooltip>
          </Stack>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 3,
              minHeight: "300px",
              alignItems: "center",
            }}
          >
            <CircularProgress size={60} thickness={4} />
          </Box>
        )}

        {/* Error State */}
        {error && !loading && (
          <Box
            sx={{
              p: 3,
              textAlign: "center",
              background: alpha(theme.palette.error.main, 0.1),
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
              mb: 3,
            }}
          >
            <Typography color="error" variant="h6" gutterBottom>
              Error Loading Authors
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {error}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={handleRefresh}
              startIcon={<Refresh />}
            >
              Retry
            </Button>
          </Box>
        )}

        {/* Empty State */}
        {!loading && !error && (!authors || authors.length === 0) && (
          <Box
            sx={{
              mt:3,
              p: 3,
              textAlign: "center",
              background: alpha(theme.palette.background.default, 0.5),
              borderRadius: 3,
              border: `1px dashed ${alpha(theme.palette.divider, 0.5)}`,
              mb: 3,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Authors Found
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Try adjusting your search or filters
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddUser}
              startIcon={<AddCircleRounded />}
            >
              Add New Author
            </Button>
          </Box>
        )}

        {/* Author Grid */}
        {!loading && !error && authors && authors.length > 0 && (
          <Grid container spacing={3} mt={2}>
            {authors.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onBlock={handleBlock}
                onViewProfile={handleViewProfile}
              />
            ))}
          </Grid>
        )}

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "text.secondary",
              typography: "body2",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Showing
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "primary.main",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              }}
            >
              {authors?.length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              of
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "primary.main",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              }}
            >
              {totalCount || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              entries
            </Typography>
          </Box>

          <Pagination
            count={Math.ceil(totalCount / filters.limit)}
            page={filters.page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: 2,
                mx: 0.5,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                },
              },
              "& .Mui-selected": {
                boxShadow: (theme) =>
                  `0 0 0 2px ${alpha(theme.palette.primary.main, 0.5)}`,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                },
              },
              "& .MuiPaginationItem-ellipsis": {
                mx: 1,
              },
            }}
          />

          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={filters.limit}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  limit: e.target.value,
                  page: 1,
                }))
              }
              sx={{
                borderRadius: 2,
                "& .MuiSelect-select": {
                  py: 1,
                },
              }}
            >
              <MenuItem value={5}>5 / page</MenuItem>
              <MenuItem value={8}>8 / page</MenuItem>
              <MenuItem value={10}>10 / page</MenuItem>
              <MenuItem value={20}>20 / page</MenuItem>
              <MenuItem value={50}>50 / page</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>
      {/* User Detail Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: "blur(10px)",
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
          },
        }}
      >
        {selectedUser && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                background: `linear-gradient(90deg, ${alpha(
                  theme.palette.primary.main,
                  0.1
                )}, transparent)`,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Avatar
                alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                src={selectedUser.avatar || "/default-avatar.png"}
                sx={{
                  width: 56,
                  height: 56,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              />
              <Box>
                <Typography variant="h6">
                  {selectedUser.firstName.charAt(0).toUpperCase() +
                    selectedUser.firstName.slice(1)}{" "}
                  {selectedUser.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedUser.role.charAt(0).toUpperCase() +
                    selectedUser.role.slice(1)}
                </Typography>
              </Box>
              <Box flexGrow={1} />
              <StatusChip
                label={selectedUser.isActive ? "Active" : "Inactive"}
                status={selectedUser.isActive ? "Active" : "Inactive"}
              />
            </DialogTitle>

            <DialogContent dividers sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {selectedUser.email}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Phone
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {selectedUser.phone || "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Joined On
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Last Login
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {selectedUser.lastActive
                      ? new Date(selectedUser.lastActive)
                          .toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })
                          .replace(",", " At")
                      : "Never logged in"}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default UserList;
