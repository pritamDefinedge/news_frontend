import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminHeader from "./Header";
import AdminSidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AdminHeader />
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout; 