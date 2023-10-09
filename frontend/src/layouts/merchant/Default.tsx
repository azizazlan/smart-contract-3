import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';

export default function Layout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 1,
        marginLeft: 2,
        marginRight: 2,
      }}
    >
      <Outlet />
      <Footer />
    </Box>
  );
}
