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
        paddingTop: 7,
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Oswald',
          fontSize: '35pt',
          fontWeight: 'bold',
          marginBottom: 5,
        }}
      >
        MES Officer
      </Typography>
      <Outlet />
      <Footer />
    </Box>
  );
}
