import { Box } from '@mui/material';

import styles from '../residency/styles';
import { useOfficialSelector } from '../../../services/hook';
import { OfficialState } from '../../../services/store';
import BackdropLoader from '../../../commons/BackdropLoader';
import VerificationForm from './VerificationForm';
import FormHeader from '../../../commons/FormHeader';
import Result from './Result';

export default function Verification() {
  const { submissionState } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  if (submissionState === 'OK') {
    return <Result />;
  }

  return (
    <Box sx={{ ...styles.container, margin: 3 }}>
      <BackdropLoader submissionState={submissionState} />
      <FormHeader title="Residency and whitelisting status" />
      <VerificationForm />
    </Box>
  );
}
