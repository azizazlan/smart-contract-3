import { Box, Typography, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import residentIcon from '../../../assets/resident.png';
import nonResidentIcon from '../../../assets/non-resident.png';

export default function Status({
  nric,
  isResident,
  handleReloadResidentStat,
  isWhitelisted,
  handleReloadWhitelistStat,
}: {
  nric: string;
  isResident: boolean;
  handleReloadResidentStat: () => void;
  isWhitelisted: boolean;
  handleReloadWhitelistStat: () => void;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '9px',
      }}
    >
      <img
        src={isResident && isWhitelisted ? residentIcon : nonResidentIcon}
        alt="resident icon"
        style={{ width: '65px' }}
      />
      <Typography
        style={{
          fontFamily: 'Oswald',
          fontSize: '12pt',
          color: 'silver',
          marginRight: '3px',
          marginTop: '4px',
        }}
      >
        NRIC
      </Typography>
      <Typography
        color="primary"
        style={{
          fontFamily: 'Oswald',
          fontSize: '16pt',
        }}
      >
        {nric}
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
        Residency status
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        {isResident ? (
          <Typography
            color="primary"
            sx={{ fontFamily: 'Oswald', fontSize: '16pt' }}
          >
            Resident
          </Typography>
        ) : (
          <Typography
            color="error"
            sx={{ fontFamily: 'Oswald', fontSize: '16pt' }}
          >
            Non-resident
          </Typography>
        )}
        <IconButton onClick={handleReloadResidentStat}>
          <ReplayIcon
            color="secondary"
            fontSize="small"
            sx={{ color: `${isResident ? 'silver' : '#c23616'}` }}
          />
        </IconButton>
      </Box>
      <Typography
        style={{
          fontFamily: 'Oswald',
          fontSize: '12pt',
          color: 'silver',
          marginRight: '3px',
          marginTop: '4px',
        }}
      >
        Whitelist status
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        {isWhitelisted ? (
          <Typography
            color="primary"
            sx={{ fontFamily: 'Oswald', fontSize: '16pt' }}
          >
            Whitelisted
          </Typography>
        ) : (
          <Typography
            color="error"
            sx={{ fontFamily: 'Oswald', fontSize: '16pt' }}
          >
            No
          </Typography>
        )}
        <IconButton onClick={handleReloadWhitelistStat}>
          <ReplayIcon
            color="secondary"
            fontSize="small"
            sx={{ color: `${isWhitelisted ? 'silver' : '#c23616'}` }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
