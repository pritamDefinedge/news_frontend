import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FaNewspaper } from "react-icons/fa";

const WebsiteHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo and Brand */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <FaNewspaper size={24} color={theme.palette.primary.main} />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                ml: 1,
                color: "text.primary",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              News Portal
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/news"
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              News
            </Button>
            <Button
              component={RouterLink}
              to="/categories"
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              Categories
            </Button>
            <Button
              component={RouterLink}
              to="/admin/login"
              variant="contained"
              color="primary"
              sx={{ fontWeight: 500 }}
            >
              Admin Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default WebsiteHeader; 