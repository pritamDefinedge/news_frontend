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
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

import { NavLink } from "react-router-dom";
import { BiAbacus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../redux/Actions/dashboardActions";
import {
  FaHome,
  FaUserCog,
  FaBoxes,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
const drawerWidth = 240;
const collapsedWidth = 80;

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome size={18} />,
    exact: true,
  },
  {
    name: "Users",
    icon: <FaUserCog size={18} />,
    subRoutes: [
      { path: "/users/add", name: "Add User", icon: <FaUserCog size={16} /> },
      { path: "/users", name: "User List", icon: <FaUserCog size={16} /> },
    ],
  },
  {
    name: "Category",
    icon: <FaBoxes size={18} />,
    subRoutes: [
      {
        path: "/category/add",
        name: "Add Category",
        icon: <FaBoxes size={16} />,
      },
      { path: "/category", name: "Category List", icon: <FaBoxes size={16} /> },
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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openMenus, setOpenMenus] = useState({});
  const isSidebarOpen = useSelector((state) => state.dashboard.isSidebarOpen);
  const dispatch = useDispatch();

  const handleToggle = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleSidebar = () => {
    dispatch(Actions.setIsSidebarOpen(!isSidebarOpen));
  };

  const drawerContent = (
    <>
      <Toolbar
        sx={{
          bgcolor: theme.palette.primary.dark,
          justifyContent: "space-between",
          minHeight: "64px !important",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        {isSidebarOpen ? (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src="/logo.png" alt="Logo" sx={{ width: 40, height: 40 }} />
            <Typography
              fontWeight={700}
              variant="h6"
              noWrap
              sx={{ color: theme.palette.common.white }}
            >
              Admin Panel
            </Typography>
          </Stack>
        ) : (
          <Avatar
            src="/logo-icon.png"
            alt="Logo"
            sx={{ width: 40, height: 40 }}
          />
        )}
        <IconButton
          sx={{
            color: "white",
            display: { sm: "none" },
          }}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
      <List
        sx={{
          overflow: "auto",
          flexGrow: 1,
          "& .MuiListItemButton-root": {
            borderRadius: 1,
            mx: 1,
            my: 0.5,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          },
        }}
      >
        {routes.map((route, index) => {
          if (route.subRoutes) {
            const isOpen = openMenus[route.name];
            return (
              <Box key={index}>
                <ListItemButton onClick={() => handleToggle(route.name)}>
                  <ListItemIcon
                    sx={{
                      color: "inherit",
                      minWidth: "40px",
                    }}
                  >
                    {route.icon}
                  </ListItemIcon>
                  {isSidebarOpen && (
                    <>
                      <ListItemText
                        primary={route.name}
                        primaryTypographyProps={{
                          fontSize: "0.875rem",
                        }}
                      />
                      {isOpen ? <ExpandLess /> : <ExpandMore />}
                    </>
                  )}
                </ListItemButton>
                <Collapse
                  in={isOpen && isSidebarOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {route.subRoutes.map((sub, i) => (
                      <StyledNavLink to={sub.path} key={i}>
                        <ListItemButton sx={{ pl: isSidebarOpen ? 6 : 2 }}>
                          <ListItemIcon
                            sx={{
                              color: "inherit",
                              minWidth: "40px",
                            }}
                          >
                            {sub.icon}
                          </ListItemIcon>
                          {isSidebarOpen && (
                            <ListItemText
                              primary={sub.name}
                              primaryTypographyProps={{
                                fontSize: "0.8125rem",
                              }}
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
            <StyledNavLink to={route.path} key={index} end={route.exact}>
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: "40px",
                  }}
                >
                  {route.icon}
                </ListItemIcon>
                {isSidebarOpen && (
                  <ListItemText
                    primary={route.name}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                    }}
                  />
                )}
              </ListItemButton>
            </StyledNavLink>
          );
        })}
      </List>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
      <Box sx={{ p: 2 }}>
        <StyledNavLink to="/logout">
          <ListItemButton>
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: "40px",
              }}
            >
              <FaSignOutAlt size={18} />
            </ListItemIcon>
            {isSidebarOpen && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                }}
              />
            )}
          </ListItemButton>
        </StyledNavLink>
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
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
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
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: isSidebarOpen ? drawerWidth : collapsedWidth,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.common.white,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
            borderRight: "none",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
