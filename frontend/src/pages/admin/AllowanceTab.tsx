import { Box, Typography } from '@mui/material';
import { useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import BackdropLoader from '../../commons/BackdropLoader';
import Result from './Result';
import AllowanceForm from './AllowanceForm';

export default function AllowanceTab() {
  const { submissionState, submissionMsg } = useAdminSelector(
    (state: AdminState) => state.admin
  );

  if (submissionState === 'FAILED' && submissionMsg) {
    return <Result title="Allowance" error={true} message={submissionMsg} />;
  }

  if (submissionState === 'OK' && submissionMsg) {
    return <Result error={false} title="Allowance" message={submissionMsg} />;
  }

  return (
    <Box sx={{ marginTop: 0 }}>
      <BackdropLoader submissionState={submissionState} />
      <Typography
        variant="body2"
        color="primary"
        sx={{ fontFamily: 'Oswald', marginTop: 2, marginBottom: 1 }}
      >
        This page allows you to approve allowance tokens to public key
      </Typography>
      <AllowanceForm />
    </Box>
  );
}
