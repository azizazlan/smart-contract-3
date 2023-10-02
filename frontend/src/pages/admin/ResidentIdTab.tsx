import { Box, Typography } from '@mui/material';
import BackdropLoader from '../../commons/BackdropLoader';
import { useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import ResidentForm from './ResidentIdForm';
import Result from './Result';

export default function ResidentIdTab() {
  const { submissionState, submissionMsg } = useAdminSelector(
    (state: AdminState) => state.admin
  );

  if (submissionState === 'FAILED' && submissionMsg) {
    return (
      <Result
        title="Award Resident ID"
        error={true}
        message={submissionMsg || 'Some message after award residency'}
      />
    );
  }

  if (submissionState === 'OK' && submissionMsg) {
    return (
      <Result
        title="Award Resident ID"
        error={false}
        message={submissionMsg || 'Some message after award residency'}
      />
    );
  }

  return (
    <Box sx={{ marginTop: 0 }}>
      <BackdropLoader submissionState={submissionState} />
      <Typography
        variant="body2"
        color="primary"
        sx={{ fontFamily: 'Oswald', marginTop: 2, marginBottom: 1 }}
      >
        This page allows you to award Resident ID to public key.
      </Typography>
      <ResidentForm />
    </Box>
  );
}
