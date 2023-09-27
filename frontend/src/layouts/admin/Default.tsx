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
      }}
    >
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            paddingLeft: '75px',
            fontFamily: 'Oswald',
            fontSize: '21pt',
            fontWeight: 'bold',
          }}
        >
          Administrator
        </Typography>
      </Box>
      <Outlet />
      <Footer />
    </Box>
  );
}
