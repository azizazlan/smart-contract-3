import { Box, Typography } from '@mui/material';
import BackdropLoader from '../../commons/BackdropLoader';
import { useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import ApproveAllowanceForm from './ApproveAllowanceForm';

export default function ApproveAllowance() {
  const { submissionState } = useAdminSelector(
    (state: AdminState) => state.admin
  );

  return (
    <Box sx={{ marginTop: 0 }}>
      <BackdropLoader submissionState={submissionState} />
      <Typography
        variant="body2"
        color="primary"
        sx={{ fontFamily: 'Oswald', marginTop: 2, marginBottom: 1 }}
      >
        This page allows you to approve allowance to officer
      </Typography>
      <ApproveAllowanceForm />
    </Box>
  );
}
