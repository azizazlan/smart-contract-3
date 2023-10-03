import React from 'react';
import { Box } from '@mui/material';
import styles from '../residency/styles';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import { OfficialState } from '../../../services/store';
import BackdropLoader from '../../../commons/BackdropLoader';
import VerificationForm from './VerificationForm';
import FormHeader from '../../../commons/FormHeader';
import Result from './Result';
import { resetSubmissionState } from '../../../services/official/reducer';

export default function Verification() {
  const dispatch = useOfficialDispatch();
  const { submissionState, submissionMsg } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  React.useEffect(() => {
    dispatch(resetSubmissionState());
  }, []);

  if (submissionState === 'OK' && submissionMsg) {
    return <Result />;
  }

  return (
    <Box sx={{ ...styles.container, margin: 3 }}>
      <BackdropLoader submissionState={submissionState} />
      <FormHeader title="Verify resident" />
      <VerificationForm />
    </Box>
  );
}
