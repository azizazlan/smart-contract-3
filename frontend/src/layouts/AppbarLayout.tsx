import React from 'react';
import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from './Footer';
import DrawerMenu from './DrawerMenu';

function Appbar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer((o) => !o);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
            Melaka FairSubsidy
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerMenu openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
    </Box>
  );
}

export default function Layout() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <Box>
      <Appbar />
      <Outlet />
      <Footer />
    </Box>
  );
}
