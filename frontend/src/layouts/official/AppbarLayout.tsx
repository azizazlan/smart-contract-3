import React from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from '../Footer';
import DrawerMenu from './DrawerMenu';
import ClearCacheDlg from '../../dialogs/ClearCacheDlg';
import { useOfficialDispatch, useResidentDispatch } from '../../services/hook';
import { default as clearResidentLocalSto } from '../../services/resident/thunks/clearLocalSto';
import { default as clearOfficialLocalSto } from '../../services/official/thunks/clearLocalSto';

function Appbar() {
  const residentDispatch = useResidentDispatch();
  const officialDispatch = useOfficialDispatch();
  const pathName = useLocation().pathname;

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openClearCache, setOpenClearCache] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer((o) => !o);
  };

  const toggleClearCache = () => {
    setOpenClearCache((o) => !o);
  };

  const handleClearLocalSto = () => {
    if (pathName.includes('/signedofficial')) {
      officialDispatch(clearOfficialLocalSto());
    } else {
      residentDispatch(clearResidentLocalSto());
    }
    toggleClearCache();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ClearCacheDlg
        open={openClearCache}
        handleClose={toggleClearCache}
        handleClear={handleClearLocalSto}
      />
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontFamily: 'Oswald', flexGrow: 1 }}
          >
            MES State Officer
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerMenu
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
        toggleClearCache={toggleClearCache}
      />
    </Box>
  );
}

export default function Layout() {
  return (
    <Box>
      <Appbar />
      <Outlet />
      <Footer />
    </Box>
  );
}
