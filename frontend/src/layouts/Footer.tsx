import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useAccountSelector } from '../services/hook';
import { AccountState } from '../services/store';

export default function Footer() {
  const { networkId } = useAccountSelector(
    (state: AccountState) => state.account
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
      <Typography variant="caption">
        Network id {networkId}
        <br />
        Built with ♥ for Melaka folks by Thuleen
      </Typography>
    </Box>
  );
}
