import {
  Stack,
  Button,
  Divider,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useResidentAccSelector } from '../../../services/hook';
import { ResidentAccState } from '../../../services/store';

export default function Landing() {
  const { submissionState, publicKey, seedPhrase } = useResidentAccSelector(
    (state: ResidentAccState) => state.residentAcc
  );

  if (publicKey && seedPhrase) {
    return <Navigate to="/account" />;
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
        state official signup
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
      <Button variant="outlined" color="primary">
        Verify resident
      </Button>
    </Stack>
  );
}
