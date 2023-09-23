import { Box } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer';

export default function Layout() {
  const pathName = useLocation().pathname;
  let title = `State Offic<Link to="/">i</Link>al`;
  if (pathName.includes('/admin')) {
    title = `Administrator`;
  } else {
    title = `State Offic<Link to="/">i</Link>al`;
  }
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
      <h1 style={{ color: '#273c75' }}>
        <Link to="/">MFS</Link> {title}
      </h1>
      <Outlet />
      <Footer />
    </Box>
  );
}
