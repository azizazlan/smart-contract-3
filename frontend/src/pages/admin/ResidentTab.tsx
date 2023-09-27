import { Box } from '@mui/material';
import BackdropLoader from '../../commons/BackdropLoader';
import { useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import ResidentForm from './ResidentForm';

export default function ResidentTab() {
  const { submissionState } = useAdminSelector(
    (state: AdminState) => state.admin
  );

  return (
    <Box sx={{ marginTop: 0 }}>
      <BackdropLoader submissionState={submissionState} />
      <ResidentForm />
    </Box>
  );
}
