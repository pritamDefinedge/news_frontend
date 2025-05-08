import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from "@mui/material";
import { FaNewspaper, FaCalendarAlt, FaUser } from "react-icons/fa";

const Home = () => {
  // Mock data for featured news
  const featuredNews = [
    {
      id: 1,
      title: "Breaking News: Major Development in Technology",
      excerpt:
        "A revolutionary breakthrough in technology that will change how we live our daily lives...",
      image: "https://source.unsplash.com/random/800x600?technology",
      category: "Technology",
      date: "2024-03-20",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Global Climate Summit Reaches Historic Agreement",
      excerpt:
        "World leaders have come together to sign a landmark agreement on climate change...",
      image: "https://source.unsplash.com/random/800x600?climate",
      category: "Environment",
      date: "2024-03-19",
      author: "Jane Smith",
    },
    {
      id: 3,
      title: "Sports: Championship Finals Set New Records",
      excerpt:
        "In an unprecedented turn of events, the championship finals have broken all previous records...",
      image: "https://source.unsplash.com/random/800x600?sports",
      category: "Sports",
      date: "2024-03-18",
      author: "Mike Johnson",
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
          mb: 6,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Stay Informed with the Latest News
              </Typography>
              <Typography variant="h5" paragraph>
                Your trusted source for breaking news, in-depth analysis, and
                exclusive stories from around the world.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<FaNewspaper />}
                sx={{ mt: 2 }}
              >
                Read Latest News
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://source.unsplash.com/random/800x600?news"
                alt="News"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured News Section */}
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom>
          Featured News
        </Typography>
        <Grid container spacing={4}>
          {featuredNews.map((news) => (
            <Grid item xs={12} md={4} key={news.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={news.image}
                  alt={news.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    label={news.category}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {news.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {news.excerpt}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: "auto",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FaUser size={14} />
                      <Typography variant="caption">{news.author}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FaCalendarAlt size={14} />
                      <Typography variant="caption">{news.date}</Typography>
                    </Box>
                  </Box>
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