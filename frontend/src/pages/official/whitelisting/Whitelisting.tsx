import React from 'react';
import Box from '@mui/material/Box';
import FormHeader from '../../../commons/FormHeader';
import styles from '../residency/styles';
import WhitelistingForm from './WhitelistingForm';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import { OfficialState } from '../../../services/store';
import Result from './Result';
import BackdropLoader from '../../../commons/BackdropLoader';
import ErrResult from './ErrResult';
import InsufficientEthAlert from '../../../commons/InsufficientEthAlert';
import { resetSubmissionState } from '../../../services/official/reducer';

export default function Whitelisting() {
  const dispatch = useOfficialDispatch();
  const { submissionState, submissionMsg, nEtherBal } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  React.useEffect(() => {
    dispatch(resetSubmissionState());
  }, []);

  if (submissionState === 'FAILED' && submissionMsg) {
    return <ErrResult message={submissionMsg} />;
  }

  if (submissionState === 'OK' && submissionMsg) {
    return <Result message={submissionMsg} />;
  }

  return (
    <Box sx={{ ...styles.container, margin: 3 }}>
      <BackdropLoader submissionState={submissionState} />
      {nEtherBal === 0 ? <InsufficientEthAlert /> : null}
      <FormHeader title="Whitelisting" />
      <WhitelistingForm />
    </Box>
  );
}
