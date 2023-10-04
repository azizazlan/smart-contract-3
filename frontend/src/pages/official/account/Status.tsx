import { Box, Typography, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import truncateEthAddr from '../../../utils/truncateEthAddr';
import minterImg from '../../../assets/minter.png';
import nonMinterImg from '../../../assets/non-minter.png';

export default function Status({
  publicKey,
  nric,
  etherBal,
  hasResidentId,
  hasMinterRole,
}: {
  publicKey: string;
  nric: number;
  etherBal: string;
  hasResidentId: boolean;
  hasMinterRole: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {hasResidentId && hasMinterRole ? (
        <img src={minterImg} alt="minter" style={{ width: '57px' }} />
      ) : (
        <img src={nonMinterImg} alt="minter" style={{ width: '85px' }} />
      )}
      <Typography
        style={{
          fontFamily: 'Oswald',
          fontSize: '12pt',
          color: 'silver',
          marginRight: '3px',
          marginTop: 17,
        }}
      >
        NRIC / Public key
      </Typography>
      <Typography
        color="primary"
        style={{
          fontFamily: 'Oswald',
          fontSize: '16pt',
        }}
      >
        {nric} ({truncateEthAddr(publicKey)})
      </Typography>
      <Typography
        style={{
          fontFamily: 'Oswald',
          fontSize: '12pt',
          color: 'silver',
          marginRight: '3px',
          marginTop: '4px',
        }}
      >
        Status
      </Typography>
      <Typography
        color="primary"
        style={{
          fontFamily: 'Oswald',
          fontSize: '16pt',
        }}
      >
        {hasResidentId ? 'Resident' : '✖ Non-resident'} (
        {hasMinterRole ? 'Minter' : '✖ Non-minter'})
      </Typography>
    </Box>
  );
}
