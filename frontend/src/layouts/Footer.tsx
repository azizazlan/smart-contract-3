import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useResidentAccSelector } from '../services/hook';
import { ResidentAccState } from '../services/store';

export default function Footer() {
  const { networkId } = useResidentAccSelector(
    (state: ResidentAccState) => state.residentAcc
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
        Built with <span style={{ color: 'red', fontSize: '12pt' }}>
          ♥
        </span>{' '}
        for Melaka folks by Thuleen
      </Typography>
    </Box>
  );
}
