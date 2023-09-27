import { Box, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
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
          component={Link}
          to="/admin"
          sx={{
            paddingLeft: '64px',
            fontFamily: 'Oswald',
            fontSize: '21pt',
            fontWeight: 'bold',
          }}
          color="primary"
        >
          Administrator
        </Typography>
      </Box>
      <Outlet />
      <Footer />
    </Box>
  );
}
