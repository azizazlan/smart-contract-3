import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';

export default function Layout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 3,
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Oswald',
          fontSize: '35pt',
          fontWeight: 'bold',
          marginBottom: 1,
        }}
      >
        MES Officer
      </Typography>
      <Outlet />
      <Footer />
    </Box>
  );
}
