import { Box, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Footer';
import mesLogo from '../../assets/malacca-flag.png';

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
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box sx={{ marginLeft: 8 }}>
          <img src={mesLogo} alt="MES logo" style={{ width: '115px' }} />
        </Box>
        <Typography
          component={Link}
          to="/admin"
          sx={{
            fontFamily: 'Oswald',
            fontSize: '21pt',
            fontWeight: 'bold',
            textDecoration: 'none',
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
