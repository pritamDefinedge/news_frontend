import React from "react";
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Avatar, 
  Box, 
  Tooltip,
  useMediaQuery,
  useTheme 
} from "@mui/material";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Actions/authActions";
import * as Actions from "../redux/Actions/dashboardActions";
import logo_icon from "../assets/login_background.svg";

const Header = ({ handleDrawerToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSidebarOpen = useSelector((state) => state.dashboard.isSidebarOpen);

  const handleToggleSidebar = () => {
    dispatch(Actions.setIsSidebarOpen(!isSidebarOpen));
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F48534",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Logout",
    });

    if (result.isConfirmed) {
      try {
        dispatch(logout());
        setTimeout(() => {
          localStorage.clear();
          navigate("/login");
        }, 1000);
      } catch (e) {
        console.error("Logout Error:", e);
      }
    }
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={1} 
      sx={{ 
        backgroundColor: "#fff", 
        color: "text.primary",
        width: { md: `calc(100% - ${isSidebarOpen ? 240 : 68}px)` },
        ml: { md: `${isSidebarOpen ? 240 : 68}px` },
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        minHeight: "64px !important" 
      }}>
        {/* Sidebar Toggle */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton 
            edge="start" 
            onClick={isMobile ? handleDrawerToggle : handleToggleSidebar} 
            color="inherit"
            sx={{ mr: 2 }}
          >
            <FaBars />
          </IconButton>
          
          {/* Logo and Name - Only show on mobile */}
          {isMobile && (
            <>
              <Avatar src={logo_icon} alt="Logo" sx={{ width: 40, height: 40, mr: 1 }} />
              <Typography variant="h6" sx={{ fontFamily: "Philosopher", color: "#1B1B45" }}>
                News
              </Typography>
            </>
          )}
        </Box>

        {/* Spacer to push logout to right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Logout Button */}
        <Tooltip title="Logout">
          <IconButton 
            onClick={handleLogout} 
            sx={{ 
              color: "#F48534", 
              "&:hover": { 
                backgroundColor: "rgba(244, 133, 52, 0.1)",
                color: "#1B1B45" 
              } 
            }}
          >
            <FaSignOutAlt />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;