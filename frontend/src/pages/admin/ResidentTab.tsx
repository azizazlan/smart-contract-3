import { Box } from '@mui/material';
import BackdropLoader from '../../commons/BackdropLoader';
import { useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import ResidentForm from './ResidentForm';
import Result from './Result';

export default function ResidentTab() {
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
      <ResidentForm />
    </Box>
  );
}
