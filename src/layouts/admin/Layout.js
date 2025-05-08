import React from "react";
import SideBar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { toggleSidebar } from '../../redux/actions/dashboard.actions';
import { Box, CssBaseline, styled, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Sidebar widths
const SIDEBAR_WIDTH_EXPANDED = 240;
const SIDEBAR_WIDTH_COLLAPSED = 68;

const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSidebarOpen' && prop !== 'isMobile',
})(({ theme, isSidebarOpen, isMobile }) => ({
  flexGrow: 1,
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'hidden',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: isMobile ? 0 : (isSidebarOpen ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED),
  width: isMobile ? '100%' : `calc(100% - ${isSidebarOpen ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED}px)`,
  position: 'relative'
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOutside = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      <SideBar isMobile={isMobile} />
      <Overlay open={isSidebarOpen && isMobile} onClick={handleClickOutside} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header isMobile={isMobile} />
        <MainContent component="main" isSidebarOpen={isSidebarOpen} isMobile={isMobile}>
          <Toolbar />
          <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: '100%', overflowX: 'hidden' }}>
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
