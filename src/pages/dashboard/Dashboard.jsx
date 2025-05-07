import React, { useEffect } from "react";
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography,
  useTheme,
  styled,
  Avatar,
  LinearProgress,
  Stack
} from "@mui/material";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import * as DashboardActions from '../../redux/Actions/dashboardActions';

// Import MUI Icons
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CategoryIcon from '@mui/icons-material/Category';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import BarChartIcon from '@mui/icons-material/BarChart';

// Styled components
const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: theme.palette.background.default,
}));

const StatCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px 0 rgba(0,0,0,0.1)',
  },
}));

const ChartCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const IconAvatar = styled(Avatar)(({ theme, color }) => ({
  width: 56,
  height: 56,
  backgroundColor: theme.palette[color].light,
  color: theme.palette[color].main,
  marginBottom: theme.spacing(2),
}));

const Dashboard = ({ dashboardData, dispatch }) => {
  const theme = useTheme();

  useEffect(() => {
    dispatch(DashboardActions.getDashboard());
  }, [dispatch]);

  // Chart data configurations
  const activityData = {
    options: {
      chart: {
        id: "activity-trend",
        toolbar: { show: false },
        foreColor: theme.palette.text.primary,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        },
      },
      tooltip: {
        theme: theme.palette.mode,
      },
    },
    series: [
      {
        name: "User Activity",
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ],
  };

  const newsDistribution = {
    options: {
      chart: {
        type: "donut",
        foreColor: theme.palette.text.primary,
      },
      labels: ["Security", "Solution", "Neftify50", "Neftify500"],
      colors: [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.success.main,
        theme.palette.warning.main,
      ],
      legend: {
        position: 'bottom',
      },
      tooltip: {
        theme: theme.palette.mode,
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total News',
              }
            }
          }
        }
      }
    },
    series: [44, 55, 41, 17],
  };

  const topNews = {
    options: {
      chart: {
        type: "bar",
        toolbar: { show: false },
        foreColor: theme.palette.text.primary,
      },
      xaxis: {
        categories: ["Security", "Solution", "Neftify50", "Neftify500"],
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        theme: theme.palette.mode,
      },
    },
    series: [
      {
        name: "Engagement",
        data: [80, 50, 30, 20],
      },
    ],
  };

  // Stats data
  const stats = [
    { 
      icon: <GroupIcon fontSize="large" />, 
      label: "Total Users", 
      value: dashboardData?.total_users || 0,
      progress: 75,
      color: 'primary'
    },
    { 
      icon: <ArticleIcon fontSize="large" />, 
      label: "Total News", 
      value: dashboardData?.total_news || 0,
      progress: 60,
      color: 'secondary'
    },
    { 
      icon: <PostAddIcon fontSize="large" />, 
      label: "Total Posts", 
      value: dashboardData?.total_posts || 0,
      progress: 45,
      color: 'success'
    },
    { 
      icon: <CategoryIcon fontSize="large" />, 
      label: "Categories", 
      value: dashboardData?.total_categories || 0,
      progress: 30,
      color: 'warning'
    },
  ];

  return (
    <DashboardContainer>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
         Admin Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <StatCard>
              <Stack direction="row" alignItems="center" spacing={3}>
                <IconAvatar color={item.color}>
                  {item.icon}
                </IconAvatar>
                <Box>
                  <Typography variant="h6" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {item.value}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={item.progress} 
                    color={item.color}
                    sx={{ 
                      height: 6,
                      borderRadius: 3,
                      mt: 1,
                      backgroundColor: theme.palette[item.color].light
                    }}
                  />
                </Box>
              </Stack>
            </StatCard>
          </Grid>
        ))}
      </Grid>
      
      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Activity Trend Chart */}
        <Grid item xs={12} md={8}>
          <ChartCard>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
              <TrendingUpIcon color="primary" />
              <Typography variant="h6">User Activity Trend</Typography>
            </Stack>
            <Chart
              options={activityData.options}
              series={activityData.series}
              type="area"
              height={300}
            />
          </ChartCard>
        </Grid>
        
        {/* News Distribution Chart */}
        <Grid item xs={12} md={4}>
          <ChartCard>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
              <EqualizerIcon color="secondary" />
              <Typography variant="h6">News Distribution</Typography>
            </Stack>
            <Chart
              options={newsDistribution.options}
              series={newsDistribution.series}
              type="donut"
              height={300}
            />
          </ChartCard>
        </Grid>
        
        {/* Top News Chart */}
        <Grid item xs={12}>
          <ChartCard>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
              <BarChartIcon color="info" />
              <Typography variant="h6">Top News Engagement</Typography>
            </Stack>
            <Chart
              options={topNews.options}
              series={topNews.series}
              type="bar"
              height={300}
            />
          </ChartCard>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

const mapStateToProps = (state) => ({
  dashboardData: state.dashboard.dashboardData,
});

export default connect(mapStateToProps)(Dashboard);