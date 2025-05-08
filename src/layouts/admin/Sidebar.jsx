import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Toolbar,
  useTheme,
  useMediaQuery,
  CssBaseline,
  styled,
  Avatar,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toggleSidebar } from "../../redux/actions/dashboard.actions";
import { logout } from "../../redux/actions/auth.actions"; // updated import
import { FaHome, FaUserCog, FaBoxes, FaSignOutAlt } from "react-icons/fa";

const drawerWidth = 240;
const collapsedWidth = 80;

const routes = [
  {
    path: "dashboard",
    name: "Dashboard",
    icon: <FaHome size={18} />,
    exact: true,
  },
  {
    name: "Author",
    icon: <FaUserCog size={18} />,
    subRoutes: [
      { path: "author/add", name: "Add Author", icon: <FaUserCog size={16} /> },
      { path: "authors", name: "Authors List", icon: <FaUserCog size={16} /> },
    ],
  },
  {
    name: "Category",
    icon: <FaBoxes size={18} />,
    subRoutes: [
      { path: "category/add", name: "Add Category", icon: <FaBoxes size={16} /> },
      { path: "category", name: "Category List", icon: <FaBoxes size={16} /> },
    ],
  },
];

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.common.white,
  "&.active": {
    "& .MuiListItemButton-root": {
      backgroundColor: theme.palette.primary.light,
      borderLeft: `4px solid ${theme.palette.secondary.main}`,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.secondary.main,
    },
    "& .MuiTypography-root": {
      fontWeight: 600,
    },
  },
}));

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openMenus, setOpenMenus] = useState({});
  const isSidebarOpen = useSelector((state) => state.dashboard.isSidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleMenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
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
      dispatch(logout()); // plain logout action
      navigate("/admin/login", { replace: true });

      Swal.fire({
        icon: "success",
        title: "Logged out",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const drawerContent = (
    <>
      <Toolbar
        sx={{
          bgcolor: theme.palette.primary.dark,
          minHeight: "64px !important",
          display: "flex",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        {isSidebarOpen ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar src="/logo.png" sx={{ width: 40, height: 40 }} />
            <Typography variant="h6" fontWeight={700} color="white">
              Admin Panel
            </Typography>
          </Stack>
        ) : (
          <Avatar src="/logo-icon.png" sx={{ width: 40, height: 40 }} />
        )}
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        )}
      </Toolbar>

      <List sx={{ flexGrow: 1, overflow: "auto", py: 1 }}>
        {routes.map((route, idx) => {
          const isOpen = openMenus[route.name];

          if (route.subRoutes) {
            return (
              <Box key={idx}>
                <ListItemButton onClick={() => handleToggleMenu(route.name)}>
                  <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                    {route.icon}
                  </ListItemIcon>
                  {isSidebarOpen && (
                    <>
                      <ListItemText primary={route.name} primaryTypographyProps={{ fontSize: 14 }} />
                      {isOpen ? <ExpandLess /> : <ExpandMore />}
                    </>
                  )}
                </ListItemButton>
                <Collapse in={isOpen && isSidebarOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {route.subRoutes.map((sub, i) => (
                      <StyledNavLink to={sub.path} key={i}>
                        <ListItemButton sx={{ pl: isSidebarOpen ? 6 : 2 }}>
                          <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{sub.icon}</ListItemIcon>
                          {isSidebarOpen && (
                            <ListItemText
                              primary={sub.name}
                              primaryTypographyProps={{ fontSize: "0.8125rem" }}
                            />
                          )}
                        </ListItemButton>
                      </StyledNavLink>
                    ))}
                  </List>
                </Collapse>
              </Box>
            );
          }

          return (
            <StyledNavLink to={route.path} key={idx} end={route.exact}>
              <ListItemButton selected={location.pathname === route.path}>
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{route.icon}</ListItemIcon>
                {isSidebarOpen && (
                  <ListItemText primary={route.name} primaryTypographyProps={{ fontSize: 14 }} />
                )}
              </ListItemButton>
            </StyledNavLink>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      <Box sx={{ p: 2 }}>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
            <FaSignOutAlt size={18} />
          </ListItemIcon>
          {isSidebarOpen && (
            <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: 14 }} />
          )}
        </ListItemButton>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: isSidebarOpen ? drawerWidth : collapsedWidth,
            transition: "width 0.3s",
            overflowX: "hidden",
            bgcolor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
