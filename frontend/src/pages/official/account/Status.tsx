import { Box, Typography, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

export default function Status({
  nric,
  hasResidentId,
  hasMinterRole,
  handleReloadStatus,
}: {
  nric: string;
  hasResidentId: boolean;
  hasMinterRole: boolean;
  handleReloadStatus: () => void;
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
        Has resident id
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        {hasResidentId ? (
          <Typography
            color="primary"
            sx={{ fontFamily: 'Oswald', fontSize: '16pt' }}
          >
            With resident id
          </Typography>
        ) : (
          <Typography
            color="error"
            sx={{ fontFamily: 'Oswald', fontSize: '16pt' }}
          >
            No resident id
          </Typography>
        )}
        <IconButton onClick={handleReloadStatus}>
          <ReplayIcon
            color="secondary"
            fontSize="small"
            sx={{ color: 'silver' }}
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
        {hasMinterRole ? (
          <Typography
            color="primary"
            sx={{ fontFamily: 'Oswald', fontSize: '16pt' }}
          >
            Minter
          </Typography>
        ) : (
          <Typography
            color="error"
            sx={{ fontFamily: 'Oswald', fontSize: '16pt' }}
          >
            Not a minter
          </Typography>
        )}
      </Box>
    </Box>
  );
}
