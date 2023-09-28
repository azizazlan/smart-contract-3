import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useResidentSelector } from '../services/hook';
import { ResidentState } from '../services/store';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { networkId } = useResidentSelector(
    (state: ResidentState) => state.resident
  );
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="caption" sx={{ color: 'silver' }}>
        Network id {networkId}
        <br />
        Built with love for{' '}
        <Link
          to="/official"
          style={{ textDecoration: 'none', color: 'silver' }}
        >
          Melaka
        </Link>{' '}
        <Link to="/" style={{ textDecoration: 'none', color: 'silver' }}>
          folks{' '}
        </Link>
        by{' '}
        <Link
          to="/admin"
          style={{
            fontFamily: 'Oswald',
            textDecoration: 'none',
            color: 'silver',
          }}
        >
          thuleen
        </Link>
      </Typography>
    </Box>
  );
}
