import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import flag from '../assets/malacca-flag.png';

export default function Layout() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={{ paddingTop: '5px', paddingBottom: '0px' }}>
        <img
          onClick={handleClick}
          src={flag}
          alt="melaka flag"
          style={{ width: '275px' }}
        />
      </Box>
      <Outlet />
      <Footer />
    </Box>
  );
}
