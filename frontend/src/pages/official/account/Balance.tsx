import { Box, Typography } from '@mui/material';
import ethLogo from '../../../assets/eth-logo.png';

export default function Balance({
  etherBal,
  publicKey,
}: {
  etherBal: string;
  publicKey: string;
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
        <img src={ethLogo} alt="Eth logo" style={{ width: '95px' }} />
        <Typography
          style={{
            fontFamily: 'Abel',
            fontSize: '11.5pt',
            marginTop: '0px',
            marginBottom: '5px',
          }}
        >
          {publicKey}
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
        <Typography
          style={{
            fontFamily: 'Abel',
            fontSize: '27pt',
            fontWeight: 'bold',
            marginTop: '-10px',
            marginBottom: '15px',
          }}
        >
          {etherBal}
        </Typography>
      </Box>
    </Box>
  );
}
