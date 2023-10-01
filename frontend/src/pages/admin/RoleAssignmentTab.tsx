import { Box, Typography } from '@mui/material';
import { useAdminDispatch, useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import BackdropLoader from '../../commons/BackdropLoader';
import RoleAssignmentForm from './RoleAssignmentForm';
import Result from './Result';
import approveAllowance from '../../services/admin/thunks/approveAllowance';

export default function RoleAssignmentTab() {
  const dispatch = useAdminDispatch();
  const {
    submissionState,
    submissionMsg,
    privateKey,
    claimantPublicKey,
    claimantAllowances,
  } = useAdminSelector((state: AdminState) => state.admin);

  const handleClickApprove = () => {
    if (!privateKey || !claimantPublicKey || !claimantAllowances) {
      console.log('One of the 3 params is null');
      return;
    }
    dispatch(
      approveAllowance({
        officerPublicKey: claimantPublicKey,
        allowances: claimantAllowances,
        privateKey,
      })
    );
  };

  if (submissionState === 'FAILED' && submissionMsg) {
    return (
      <Result
        title="Assign role and allowance"
        error={true}
        message={submissionMsg}
      />
    );
  }

  if (submissionState === 'OK' && submissionMsg) {
    return (
      <Result
        error={false}
        title="Assign role and allowance"
        message={submissionMsg}
        handleClickApprove={handleClickApprove}
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
        This page allows you to assign officer role and approve token allowances
        to a public key.
      </Typography>
      <RoleAssignmentForm />
    </Box>
  );
}
