import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from '../Footer';
import DrawerMenu from './DrawerMenu';
import ClearCacheDlg from '../../commons/ClearCacheDlg';
import { useResidentDispatch, useResidentSelector } from '../../services/hook';
import clearLocalSto from '../../services/resident/thunks/clearLocalSto';
import { ResidentState } from '../../services/store';
import QrDialog from '../../commons/QrDialog';

function Appbar() {
  const dispatch = useResidentDispatch();
  const { qrcode } = useResidentSelector(
    (state: ResidentState) => state.resident
  );

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openQrCode, setOpenQrCode] = React.useState(false);
  const [openClearCache, setOpenClearCache] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer((o) => !o);
  };

  const toggleQrCode = () => {
    setOpenQrCode((o) => !o);
  };

  const toggleClearCache = () => {
    setOpenClearCache((o) => !o);
  };

  const handleClearLocalSto = () => {
    dispatch(clearLocalSto());
    toggleClearCache();
  };

  return (
    <Box>
      <QrDialog
        appBackgroundColor="#273c75"
        qrcode={qrcode}
        open={openQrCode}
        handleClose={toggleQrCode}
      />
      <ClearCacheDlg
        open={openClearCache}
        handleClose={toggleClearCache}
        handleClear={handleClearLocalSto}
      />
      <AppBar position="static">
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
            Melaka EquiSubsidy
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerMenu
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
        toggleQrCode={toggleQrCode}
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
