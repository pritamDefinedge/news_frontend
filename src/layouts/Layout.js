import React from "react";
import SideBar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../redux/Actions/dashboardActions";
import { Box, CssBaseline, styled, Toolbar } from "@mui/material";

const MainContent = styled(Box)(({ theme, isSidebarOpen }) => ({
  flexGrow: 1,
  height: '100vh',
  overflowY: 'auto',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: isSidebarOpen ? 240 : 68,
  width: `calc(100% - ${isSidebarOpen ? 240 : 68}px)`,
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    width: '100%',
  },
}));

const Overlay = styled(Box)(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: theme.zIndex.drawer + 1,
  display: open ? 'block' : 'none',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const Layout = ({ dispatch, isSidebarOpen }) => {
  const handleClickOutside = () => {
    dispatch(Actions.setIsSidebarOpen(false));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      {/* Sidebar & Header sit side-by-side with MainContent */}
      <SideBar />
      <Overlay open={isSidebarOpen} onClick={handleClickOutside} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <MainContent component="main" isSidebarOpen={isSidebarOpen}>
          <Toolbar /> {/* Spacer for AppBar height */}
          <Box sx={{ p: 3 }}>
            <Outlet />
          </Box>
        </MainContent>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  isSidebarOpen: state.dashboard.isSidebarOpen,
});

export default connect(mapStateToProps)(Layout);
