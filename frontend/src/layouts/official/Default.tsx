import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import flag from '../../assets/malacca-flag.png';

export default function Layout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 7,
      }}
    >
      <img
        src={flag}
        alt="melaka flag"
        style={{ width: '225px', marginBottom: 7 }}
      />
      <Outlet />
      <Footer />
    </Box>
  );
}
