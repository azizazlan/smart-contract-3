import Box from '@mui/material/Box';
import FormHeader from '../../../commons/FormHeader';
import styles from '../residency/styles';
import WhitelistingForm from './WhitelistingForm';
import { useOfficialSelector } from '../../../services/hook';
import { OfficialState } from '../../../services/store';
import Result from './Result';
import BackdropLoader from '../../../commons/BackdropLoader';
import ErrResult from './ErrResult';

export default function Whitelisting() {
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
      <FormHeader title="Whitelisting" />
      <WhitelistingForm />
    </Box>
  );
}
