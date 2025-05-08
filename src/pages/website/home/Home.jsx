import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Latest News",
      description: "Stay updated with the most recent news and events from around the world.",
      icon: "📰",
    },
    {
      title: "Category Based",
      description: "Browse news by categories to find exactly what interests you.",
      icon: "📑",
    },
    {
      title: "User Friendly",
      description: "Easy to navigate interface designed for the best user experience.",
      icon: "👥",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom>
            Welcome to News Portal
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Your trusted source for the latest news and updates
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate("/admin/login")}
          >
            Admin Login
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h1" sx={{ mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 