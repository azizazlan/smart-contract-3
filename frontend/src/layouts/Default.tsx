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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 7,
      }}
    >
      <img
        onClick={handleClick}
        src={flag}
        alt="melaka flag"
        style={{ width: '225px' }}
      />
      <h1 style={{ color: '#273c75' }}>Resident</h1>
      <Outlet />
      <Footer />
    </Box>
  );
}
