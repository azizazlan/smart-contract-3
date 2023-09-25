import { Box, IconButton, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import truncateEthAddr from '../../../utils/truncateEthAddr';

export default function Balance({
  etherBal,
  publicKey,
  handleReloadBal,
}: {
  etherBal: string;
  publicKey: string;
  handleReloadBal: () => void;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '25px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '17px',
          alignItems: 'center',
        }}
      >
        <Jazzicon diameter={55} seed={jsNumberForAddress(publicKey)} />
        <Typography
          color="primary"
          style={{
            fontFamily: 'Oswald',
            fontSize: '16pt',
            marginTop: '0px',
            marginBottom: '5px',
          }}
        >
          {truncateEthAddr(publicKey)}
        </Typography>
        <Typography
          style={{
            fontFamily: 'Oswald',
            fontSize: '12pt',
            color: 'silver',
          }}
        >
          Ether Balance
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            color="primary"
            style={{
              fontFamily: 'Oswald',
              fontSize: '16pt',
            }}
          >
            {etherBal}
          </Typography>
          <IconButton onClick={handleReloadBal}>
            <ReplayIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
