import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import InfoIcon from '@mui/icons-material/Info';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function DrawerMenu({
  openDrawer,
  toggleDrawer,
}: {
  openDrawer: boolean;
  toggleDrawer: () => void;
}) {
  const list = () => (
    <Box
      sx={{ auto: 275 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem key="Account" disablePadding>
          <ListItemButton component={Link} to="/account">
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: 'silver' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
                  Account
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem key="Verify" disablePadding>
          <ListItemButton component={Link} to="/account/verify">
            <ListItemIcon>
              <SensorOccupiedIcon sx={{ color: 'silver' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
                  Verify
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="About" disablePadding>
          <ListItemButton component={Link} to="/account/about">
            <ListItemIcon>
              <InfoIcon sx={{ color: 'silver' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
                  About
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
      {list()}
    </Drawer>
  );
}
