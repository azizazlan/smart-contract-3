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
    return <Result title="Assign role" error={true} message={submissionMsg} />;
  }

  if (submissionState === 'OK' && submissionMsg) {
    return <Result error={false} title="Assign role" message={submissionMsg} />;
  }

  return (
    <Box sx={{ marginTop: 0 }}>
      <BackdropLoader
        submissionState={submissionState}
        message="...minting on blockchain take a little bit of time..."
      />
      <Typography
        variant="body2"
        color="primary"
        sx={{ fontFamily: 'Oswald', marginTop: 2, marginBottom: 1 }}
      >
        This page allows you to assign officer-minter role to a public key.
      </Typography>
      <RoleAssignmentForm />
    </Box>
  );
}
