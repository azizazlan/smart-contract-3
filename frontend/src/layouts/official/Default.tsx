import { Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Footer';

export default function Layout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f1f2f6',
        height: '100vh',
      }}
    >
      <h1>
        <Link to="/">MFS</Link> State Offic<Link to="/">i</Link>al
      </h1>
      <Outlet />
      <Footer />
    </Box>
  );
}
