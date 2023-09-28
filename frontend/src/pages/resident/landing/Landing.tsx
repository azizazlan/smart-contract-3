import {
  Stack,
  Button,
  Divider,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useResidentSelector } from '../../../services/hook';
import { ResidentState } from '../../../services/store';

export default function Landing() {
  const { submissionState, publicKey, seedPhrase } = useResidentSelector(
    (state: ResidentState) => state.resident
  );

  if (publicKey && seedPhrase) {
    return <Navigate to="/signedresident" />;
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
        sx={{ minWidth: '235px' }}
        variant="contained"
        component={Link}
        to="/signup"
      >
        resident signup
      </Button>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/restore"
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
