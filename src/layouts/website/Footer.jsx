import React from "react";
import { Box, Container, Typography, Link, Grid } from "@mui/material";
import { FaNewspaper, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const WebsiteFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FaNewspaper size={24} color="#1976d2" />
              <Typography
                variant="h6"
                sx={{ ml: 1, fontWeight: 700, color: "text.primary" }}
              >
                News Portal
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Your trusted source for the latest news and updates from around the
              world.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/news" color="inherit" display="block" sx={{ mb: 1 }}>
              News
            </Link>
            <Link href="/categories" color="inherit" display="block" sx={{ mb: 1 }}>
              Categories
            </Link>
            <Link href="/admin/login" color="inherit" display="block">
              Admin Login
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link href="#" color="inherit">
                <FaFacebook size={24} />
              </Link>
              <Link href="#" color="inherit">
                <FaTwitter size={24} />
              </Link>
              <Link href="#" color="inherit">
                <FaInstagram size={24} />
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: "divider" }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} News Portal. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default WebsiteFooter; 