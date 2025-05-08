import React from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import WebsiteHeader from "./Header";
import WebsiteFooter from "./Footer";

const WebsiteLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <WebsiteHeader />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
      <WebsiteFooter />
    </Box>
  );
};

export default WebsiteLayout; 