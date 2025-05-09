import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Typography,
  CircularProgress,
  Pagination,
  Paper,
  alpha,
  Stack,
  InputAdornment,
  Tooltip,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { AddCircleRounded, Search, Sort, Refresh } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";
import {
  getCategories,
  deleteCategory,
  updateCategoryStatus,
} from "../../../redux/actions/category.actions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CategoryTable = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    isActive: "",
    page: 1,
    limit: 10,
    sortBy: "order",
    sortOrder: "asc",
  });

  const { categories, loading, error, currentPage, totalPages } =
    useSelector((state) => state.category);

  // Debounced search effect
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const queryParams = {
        ...filters,
        search: searchTerm.trim(),
      };
      if (queryParams.isActive === "") delete queryParams.isActive;

      dispatch(getCategories(queryParams));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, filters, dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  const handleRefresh = () => {
    const queryParams = {
      ...filters,
      search: searchTerm.trim(),
    };

    if (queryParams.isActive === "") delete queryParams.isActive;
    
    dispatch(getCategories(queryParams));
  };

  // const handleRefresh = () => {
  //   dispatch(
  //     getCategories({
  //       ...filters,
  //       search: searchTerm.trim(),
  //     })
  //   );
  // };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value === "null" ? null : value,
      page: 1,
    }));
  };

  const handleSort = (field) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder:
        prev.sortBy === field && prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  const handleAddCategory = () => {
    navigate("/admin/category/add");
  };

  const handlePageChange = (event, value) => {
    setFilters((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const handleEdit = (category) => {
    navigate(`/admin/category/edit/${category._id}`);
  };

  const handleDelete = (category) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: theme.palette.error.main,
      cancelButtonColor: theme.palette.text.disabled,
      confirmButtonText: "Yes, delete it!",
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(category._id))
          .then(() => {
            toast.success("Category deleted successfully");
            handleRefresh();
          })
          .catch((error) => {
            toast.error(error.message || "Failed to delete category");
          });
      }
    });
  };

  const handleToggleStatus = (category) => {
    const newStatus = category.status === "Active" ? "Blocked" : "Active";
    const actionText = category.status === "Active" ? "deactivate" : "activate";
    
    Swal.fire({
      title: `Change status to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor:
        category.status === "Active"
          ? theme.palette.warning.main
          : theme.palette.success.main,
      cancelButtonColor: theme.palette.text.disabled,
      confirmButtonText: `Yes, ${actionText} it!`,
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateCategoryStatus(category._id, { status: newStatus }))
          .then(() => {
            toast.success(`Category status updated to ${newStatus}`);
            handleRefresh();
          })
          .catch((error) => {
            toast.error(error.message || "Failed to update status");
          });
      }
    });
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 80,
      renderCell: (params) => (
        <img
          src={params.value || "/default-category.png"}
          alt="category"
          style={{ 
            width: 40, 
            height: 40, 
            borderRadius: "6px",
            objectFit: "cover"
          }}
          onError={(e) => {
            e.target.src = "/default-category.png";
          }}
        />
      ),
    },
    { 
      field: "title", 
      headerName: "Title", 
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.value}
        </Typography>
      ),
    },
    { 
      field: "slug", 
      headerName: "Slug", 
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "order",
      headerName: "Order",
      width: 100,
      renderHeader: () => (
        <Box display="flex" alignItems="center">
          <span>Order</span>
          <IconButton 
            size="small" 
            onClick={() => handleSort("order")}
            aria-label="sort by order"
          >
            <Sort fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Typography
          variant="body2"
          color={params.value === "Active" ? "success.main" : "error.main"}
          fontWeight={500}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      renderCell: (params) =>
        new Date(params.value).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      renderHeader: () => (
        <Box display="flex" alignItems="center">
          <span>Created At</span>
          <IconButton 
            size="small" 
            onClick={() => handleSort("createdAt")}
            aria-label="sort by creation date"
          >
            <Sort fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Tooltip title="Edit">
            <IconButton 
              onClick={() => handleEdit(params.row)} 
              size="small"
              aria-label="edit category"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={params.row.status === "Active" ? "Deactivate" : "Activate"}
          >
            <IconButton
              onClick={() => handleToggleStatus(params.row)}
              size="small"
              aria-label="toggle status"
            >
              {params.row.status === "Active" ? (
                <ToggleOffIcon fontSize="small" color="warning" />
              ) : (
                <ToggleOnIcon fontSize="small" color="success" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton 
              onClick={() => handleDelete(params.row)} 
              size="small"
              aria-label="delete category"
            >
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme={theme.palette.mode}
      />

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: `0 4px 20px -8px ${alpha(theme.palette.primary.main, 0.1)}`,
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
            Category Management
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <TextField
              size="small"
              placeholder="Search Categories..."
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
                aria-label="refresh"
              >
                <Refresh />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleRounded />}
              onClick={handleAddCategory}
              sx={{
                borderRadius: 3,
                boxShadow: `0 4px 12px -4px ${alpha(theme.palette.primary.main, 0.3)}`,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 6px 16px -4px ${alpha(theme.palette.primary.main, 0.4)}`,
                },
              }}
            >
              Add Category
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

          <Tooltip title={`Sort by ${filters.sortBy} (${filters.sortOrder})`}>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" sx={{ mr: 1 }}>
                Sort:
              </Typography>
              <Button
                size="small"
                endIcon={<Sort />}
                onClick={() => handleSort(filters.sortBy)}
                aria-label="sort button"
              >
                {filters.sortBy.charAt(0).toUpperCase() + filters.sortBy.slice(1)}
              </Button>
            </Box>
          </Tooltip>
        </Box>

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
              Error Loading Categories
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
        {!loading && !error && categories && categories.length === 0 && (
          <Box
            sx={{
              mt: 3,
              p: 3,
              textAlign: "center",
              background: alpha(theme.palette.background.default, 0.5),
              borderRadius: 3,
              border: `1px dashed ${alpha(theme.palette.divider, 0.5)}`,
              mb: 3,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Categories Found
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Try adjusting your search or filters
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
              startIcon={<AddCircleRounded />}
            >
              Add New Category
            </Button>
          </Box>
        )}

        {/* Loading State */}
        {loading ? (
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
        ) : (
          categories && categories.length > 0 && (
            <>
              <Box sx={{ height: 500, width: "100%", mt: 2 }}>
                <DataGrid
                  rows={categories}
                  columns={columns}
                  autoHeight
                  disableRowSelectionOnClick
                  getRowId={(row) => row._id}
                  pageSizeOptions={[filters.limit]}
                  hideFooter
                  sx={{
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: theme.palette.action.hover,
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    },
                    "& .MuiDataGrid-cellContent": {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                />
              </Box>

              {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={2}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          )
        )}
      </Paper>
    </Box>
  );
};

export default CategoryTable;