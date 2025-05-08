import React, { useEffect, useState } from "react";
import {
  Grid,
  Chip,
  IconButton,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser, deleteUsers } from '../../../redux/actions/user.actions';
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const usersData = useSelector((state) => state.user.users);
  const error = useSelector((state) => state.user.error);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);


  useEffect(() => {
    dispatch(getUsers({ search: debouncedSearchTerm }));
  }, [dispatch, debouncedSearchTerm]);

  const handleEdit = (rowData) => {
    navigate(`/users/edit/${rowData.id}`);
  };

  const handleDelete = (rowData) => {
    dispatch(deleteUser(rowData.id));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleMultipleDelete = () => {
    if (selectedRows.length > 0) {
      dispatch(deleteUsers({ ids: selectedRows }));
    } else {
      alert("Please select at least one category to delete.");
    }
  };

  const columns = [
    { field: "serial", headerName: "S.No", flex: 0.3, sortable: true },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 0.7 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) =>
        params.value === "Active" ? (
          <Chip
            label="Active"
            size="small"
            variant="outlined"
            color="success"
          />
        ) : (
          <Chip label="Blocked" size="small" variant="outlined" color="error" />
        ),
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => handleEdit(params.row)}
            color="primary"
            aria-label="edit"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row)}
            color="secondary"
            aria-label="delete"
          >
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = usersData.map((user, index) => ({
    id: user._id,
    serial: index + 1,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    status: user.status,
    phone: user.phone,
    gender: user.gender,
    createdAt: user.createdAt,
  }));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (error) {
    return (
      <Typography color="error" align="center" variant="h6">
        {error}
      </Typography>
    );
  }

  return (
    <>
      <Paper elevation={3} style={{ padding: 16 }}>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Users List
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              alignItems: "center",
            }}
          >
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 250 }}
            />
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Delete />}
              onClick={handleMultipleDelete}
              disabled={selectedRows.length === 0}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleRounded />}
              onClick={() => navigate("/users/add")}
            >
              Add New
            </Button>
          </Box>
        </Box>

        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          getRowId={(row) => row.id}
          isRowSelectable={(params) => true}
          onRowSelectionModelChange={(ids) => {
            setSelectedRows(ids);
          }}
          disableSelectionOnClick
          checkboxSelection
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Paper>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage || "fallback_image_url"}
            alt="Selected banner"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default List;
