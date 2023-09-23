import { Box } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import flag from '../../assets/malacca-flag.png';

export default function Layout() {
  const pathName = useLocation().pathname;
  let title = `State Offic<Link to="/">i</Link>al`;
  if (pathName.includes('/admin')) {
    title = `Administrator`;
  } else {
    title = `State Official`;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        paddingTop: 7,
      }}
    >
      <img src={flag} alt="melaka flag" style={{ width: '225px' }} />
      <h1 style={{ color: '#273c75' }}>{title}</h1>
      <Outlet />
      <Footer />
    </Box>
  );
}
