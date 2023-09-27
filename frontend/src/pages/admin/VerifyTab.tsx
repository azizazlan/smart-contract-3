import { Box } from '@mui/material';
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
  } = useAdminSelector((state: AdminState) => state.admin);

  if (submissionState === 'FAILED' && submissionMsg) {
    return <Result error={true} message={submissionMsg} />;
  }

  if (submissionState === 'OK' && submissionMsg) {
    return (
      <ResultStatus
        isResident={isClaimantResident}
        isOfficer={isClaimantOfficer}
        isWhitelisted={isClaimantWhitelisted}
        error={false}
        message={submissionMsg}
      />
    );
  }

  return (
    <Box>
      <BackdropLoader submissionState={submissionState} />
      <VerifyForm />
    </Box>
  );
}
