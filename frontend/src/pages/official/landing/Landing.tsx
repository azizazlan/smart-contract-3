import {
  Stack,
  Button,
  Divider,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useOfficialSelector } from '../../../services/hook';
import { OfficialState } from '../../../services/store';

export default function Landing() {
  const { submissionState, publicKey, seedPhrase } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  if (publicKey && seedPhrase) {
    return <Navigate to="/signedofficial" />;
  }

  return (
    <Stack spacing={1} direction="column">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={submissionState === 'PENDING'}
        onClick={() => console.log('Close backdrop')}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Button
        sx={{ minWidth: '235px', backgroundColor: 'black' }}
        variant="contained"
        component={Link}
        to="/official/signup"
      >
        state official signup
      </Button>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/official/restore"
      >
        Restore
      </Button>
      <Divider />
      <Button variant="outlined" color="primary" component={Link} to="/verify">
        Verify
      </Button>
    </Stack>
  );
}
