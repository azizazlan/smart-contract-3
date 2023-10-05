import { Box, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { styled } from '@mui/material/styles';
import residentIcon from '../../../assets/resident.png';
import nonResidentIcon from '../../../assets/non-resident.png';
import truncateEthAddr from '../../../utils/truncateEthAddr';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function Status({
  nric,
  publicKey,
  hasResidentId,
  isWhitelisted,
  handleClickAvatar,
}: {
  publicKey: string;
  nric: number;
  hasResidentId: boolean;
  isWhitelisted: boolean;
  handleClickAvatar: () => void;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Badge
        onClick={handleClickAvatar}
        sx={{ width: '65px', height: '65px' }}
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <SmallAvatar alt="Jazzicon" sx={{ width: '42px', height: '42px' }}>
            <Jazzicon diameter={55} seed={jsNumberForAddress(publicKey)} />
          </SmallAvatar>
        }
      >
        <Avatar
          alt="Travis Howard"
          sx={{
            width: '72px',
            height: '72px',
            cursor: 'pointer',
            backgroundColor: `${
              hasResidentId && isWhitelisted ? 'white' : '#f1f2f6'
            }`,
          }}
        >
          <img
            src={
              hasResidentId && isWhitelisted ? residentIcon : nonResidentIcon
            }
            alt="resident icon"
          />
        </Avatar>
      </Badge>
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
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography
          color="primary"
          sx={{
            fontFamily: 'Oswald',
            fontSize: '16pt',
          }}
        >
          {hasResidentId ? 'Resident' : 'Non-resident'} (
          {isWhitelisted ? 'Whitelisted' : 'Not whitelisted'})
        </Typography>
      </Box>
    </Box>
  );
}
