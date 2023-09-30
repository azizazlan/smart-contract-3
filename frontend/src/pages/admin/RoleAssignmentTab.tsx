import { Box, Typography } from '@mui/material';
import { useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import BackdropLoader from '../../commons/BackdropLoader';
import RoleAssignmentForm from './RoleAssignmentForm';
import Result from './Result';

export default function RoleAssignmentTab() {
  const { submissionState, submissionMsg } = useAdminSelector(
    (state: AdminState) => state.admin
  );

  if (submissionState === 'FAILED' && submissionMsg) {
    return (
      <Result
        error={true}
        message={submissionMsg || 'Some message after award residency'}
      />
    );
  }

  if (submissionState === 'OK' && submissionMsg) {
    return (
      <Result
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
        This page allows you to approve allowance MelakaRice tokens and assign
        officer role to a public key.
      </Typography>
      <RoleAssignmentForm />
    </Box>
  );
}
