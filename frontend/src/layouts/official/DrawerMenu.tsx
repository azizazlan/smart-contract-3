import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import InfoIcon from '@mui/icons-material/Info';
import MemoryIcon from '@mui/icons-material/Memory';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import QrCodeIcon from '@mui/icons-material/QrCode';
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
        <ListItem key="Account" disablePadding>
          <ListItemButton component={Link} to="/signedofficial">
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: 'grey' }} />
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
              <MemoryIcon sx={{ color: 'grey' }} />
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
        <ListItem key="Verify" disablePadding>
          <ListItemButton component={Link} to="/signedofficial/residency">
            <ListItemIcon>
              <PersonAddIcon sx={{ color: 'grey' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
                  Award residency
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem key="Verify" disablePadding>
          <ListItemButton component={Link} to="/signedofficial/residency">
            <ListItemIcon>
              <PersonRemoveIcon sx={{ color: 'grey' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="secondary" sx={{ fontFamily: 'Oswald' }}>
                  Revoke residency
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="Verify" disablePadding>
          <ListItemButton
            component={Link}
            to="/signedofficial/whitelist-residency"
          >
            <ListItemIcon>
              <LinkIcon sx={{ color: 'grey' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
                  Add whitelist
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem key="Verify" disablePadding>
          <ListItemButton
            component={Link}
            to="/signedofficial/whitelist-residency"
          >
            <ListItemIcon>
              <LinkOffIcon sx={{ color: 'grey' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
                  Remove whitelist
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="Verify" disablePadding>
          <ListItemButton component={Link} to="/signedofficial/check-residency">
            <ListItemIcon />
            <ListItemText
              primary={
                <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
                  Verify residency
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem key="Verify" disablePadding>
          <ListItemButton component={Link} to="/signedofficial/transfer">
            <ListItemIcon />
            <ListItemText
              primary={
                <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
                  Transfer subsidy
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="About" disablePadding>
          <ListItemButton component={Link} to="/signedofficial/about">
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
