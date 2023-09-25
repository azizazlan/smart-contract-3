import { Box, Typography, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

export default function Status({
  nric,
  isResident,
  handleReloadResidentStat,
  isOfficer,
  handleReloadRole,
}: {
  nric: string;
  isResident: boolean;
  handleReloadResidentStat: () => void;
  isOfficer: boolean;
  handleReloadRole: () => void;
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
        Status
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
        Role
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        {isOfficer ? (
          <Typography
            color="primary"
            sx={{ fontFamily: 'Oswald', fontSize: '16pt' }}
          >
            Officer
          </Typography>
        ) : (
          <Typography
            color="error"
            sx={{ fontFamily: 'Oswald', fontSize: '16pt' }}
          >
            NA
          </Typography>
        )}
        <IconButton onClick={handleReloadRole}>
          <ReplayIcon
            color="primary"
            fontSize="small"
            sx={{ color: `${isOfficer ? 'silver' : '#c23616'}` }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
