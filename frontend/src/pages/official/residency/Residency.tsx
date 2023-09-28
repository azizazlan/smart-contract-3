import React from 'react';
import Box from '@mui/material/Box';
import styles from './styles';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import { OfficialState } from '../../../services/store';
import FormHeader from '../../../commons/FormHeader';
import ResidencyForm from './ResidencyForm';
import BackdropLoader from '../../../commons/BackdropLoader';
import Result from './Result';
import ErrResult from './ErrResult';
import InsufficientEthAlert from '../../../commons/InsufficientEthAlert';
import { resetSubmissionState } from '../../../services/official/reducer';

export default function Residency() {
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
      <FormHeader title="Residency" />
      <ResidencyForm />
    </Box>
  );
}
