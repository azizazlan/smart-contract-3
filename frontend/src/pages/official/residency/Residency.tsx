import Box from '@mui/material/Box';
import styles from './styles';
import { useOfficialSelector } from '../../../services/hook';
import { OfficialState } from '../../../services/store';
import FormHeader from '../../../commons/FormHeader';
import ResidencyForm from './ResidencyForm';
import BackdropLoader from '../../../commons/BackdropLoader';
import Result from './Result';
import ErrResult from './ErrResult';

export default function Residency() {
  const { submissionState, submissionMsg } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  if (submissionState === 'FAILED' && submissionMsg) {
    return <ErrResult message={submissionMsg} />;
  }

  if (submissionState === 'OK' && submissionMsg) {
    return <Result message={submissionMsg} />;
  }

  return (
    <Box sx={{ ...styles.container, margin: 3 }}>
      <BackdropLoader submissionState={submissionState} />
      <FormHeader title="Residency" />
      <ResidencyForm />
    </Box>
  );
}
