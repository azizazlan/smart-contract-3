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
        Built with love for <Link to="/official">Melaka</Link> folks by{' '}
        <span style={{ fontFamily: 'Oswald', fontWeight: 'bold' }}>
          thuleen
        </span>
      </Typography>
    </Box>
  );
}
