import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

export default function LayoutWithAppbar() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Outlet />
      <Footer />
    </Box>
  );
}
