import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import WalletIcon from '@mui/icons-material/Wallet';
import InfoIcon from '@mui/icons-material/Info';
import MemoryIcon from '@mui/icons-material/Memory';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type DrawerMenuProps = {
  openDrawer: boolean;
  toggleDrawer: () => void;
  toggleClearCache: () => void;
  toggleQrCode: () => void;
};

export default function DrawerMenu({
  openDrawer,
  toggleDrawer,
  toggleQrCode,
  toggleClearCache,
}: DrawerMenuProps) {
  const list = () => (
    <Box
      sx={{ auto: 275 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem key="Home" disablePadding>
          <ListItemButton component={Link} to="/signedresident">
            <ListItemIcon />
            <ListItemText
              primary={
                <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
                  Home
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem key="Wallet" disablePadding>
          <ListItemButton component={Link} to="/signedresident/account">
            <ListItemIcon>
              <WalletIcon sx={{ color: 'grey' }} />
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
        <ListItem key="Claim" disablePadding>
          <ListItemButton component={Link} to="/signedresident/claim">
            <ListItemIcon>
              <CompareArrowsIcon sx={{ color: 'red' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="error" sx={{ fontFamily: 'Oswald' }}>
                  Claim
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem key="QrCodeDlg" disablePadding>
          <ListItemButton onClick={toggleQrCode}>
            <ListItemIcon>
              <QrCodeIcon sx={{ color: 'grey' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
                  QR code
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>

        <ListItem key="ClearStorage" disablePadding>
          <ListItemButton onClick={toggleClearCache}>
            <ListItemIcon>
              <MemoryIcon sx={{ color: 'red' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="error" sx={{ fontFamily: 'Oswald' }}>
                  Clear cache
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="About" disablePadding>
          <ListItemButton component={Link} to="/signedresident/about">
            <ListItemIcon>
              <InfoIcon sx={{ color: 'grey' }} />
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
