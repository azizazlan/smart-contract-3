import { Box, Typography } from '@mui/material';
import VerifyForm from './VerifyForm';
import { useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import Result from './Result';
import ResultStatus from './ResultStatus';
import BackdropLoader from '../../commons/BackdropLoader';

export default function VerifyTab() {
  const {
    submissionState,
    submissionMsg,
    isClaimantOfficer,
    isClaimantResident,
    isClaimantWhitelisted,
    claimantAllowances,
  } = useAdminSelector((state: AdminState) => state.admin);

  if (submissionState === 'FAILED' && submissionMsg) {
    return <Result error={true} message={submissionMsg} />;
  }

  if (submissionState === 'OK' && submissionMsg) {
    return (
      <ResultStatus
        isResident={isClaimantResident}
        isOfficer={isClaimantOfficer}
        allowances={claimantAllowances}
        isWhitelisted={isClaimantWhitelisted}
        error={false}
        message={submissionMsg}
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
        This page allows you to verify residency, whitelist status and to check
        if public key has been assigned as officer.
      </Typography>
      <VerifyForm />
    </Box>
  );
}
