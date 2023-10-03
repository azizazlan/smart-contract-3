import { Box, Typography } from '@mui/material';
import VerifyForm from './CheckForm';
import { useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import Result from './Result';
import BackdropLoader from '../../commons/BackdropLoader';
import CheckResultStatus from './CheckResultStatus';

export default function CheckTab() {
  const {
    submissionState,
    submissionMsg,
    isClaimantHasIdentity,
    isClaimantHasMinterRole,
    claimantAllowances,
  } = useAdminSelector((state: AdminState) => state.admin);

  if (submissionState === 'FAILED' && submissionMsg) {
    return <Result error={true} message={submissionMsg} />;
  }

  if (submissionState === 'OK' && submissionMsg) {
    return (
      <CheckResultStatus
        message={submissionMsg}
        error={false}
        hasResidentId={isClaimantHasIdentity}
        hasMinterRole={isClaimantHasMinterRole}
        allowances={claimantAllowances}
      />
    );
  }

  return (
    <Box>
      <BackdropLoader submissionState={submissionState} />
      <Typography
        variant="body2"
        color="primary"
        sx={{ fontFamily: 'Oswald', marginTop: 2, marginBottom: 1 }}
      >
        This page allows you to check resident id, minter role and allowances.
      </Typography>
      <VerifyForm />
    </Box>
  );
}
