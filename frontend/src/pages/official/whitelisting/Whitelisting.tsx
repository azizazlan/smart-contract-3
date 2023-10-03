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
import {
  resetSubmissionState,
  setClaimantNricPublicKey,
} from '../../../services/official/reducer';
import QrReader from '../../../commons/QrReader';
import ScanError from '../../../commons/ScanError';

export default function Whitelisting() {
  const [camera, setCamera] = React.useState(false);
  const [error, setError] = React.useState(false);
  const dispatch = useOfficialDispatch();
  const { submissionState, submissionMsg, nEtherBal } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  React.useEffect(() => {
    dispatch(resetSubmissionState());
  }, []);

  const handleOnDecode = (result: string) => {
    console.log(result);
    if (!result.includes('_')) {
      setCamera((o) => !o);
      setError((o) => !o);
    }
    const codes = result.split('_');
    const nric = codes[0];
    const publicKey = codes[1];
    dispatch(setClaimantNricPublicKey({ nric, publicKey }));
    handleCancelScan();
  };

  const handleCloseCamera = () => {
    setCamera(false);
  };

  const handleCancelScan = () => {
    setError((o) => !o);
  };

  const handleScanAgain = () => {
    setError((o) => !o);
    setCamera((o) => !o);
  };

  const toggleCamera = () => {
    setCamera(true);
    setError(false);
  };

  if (submissionState === 'FAILED' && submissionMsg) {
    return <ErrResult message={submissionMsg} />;
  }

  if (submissionState === 'OK' && submissionMsg) {
    return <Result message={submissionMsg} />;
  }

  if (!camera && error) {
    return (
      <ScanError
        handleCancel={handleCancelScan}
        handleScanAgain={handleScanAgain}
      />
    );
  }

  if (camera && !error) {
    return (
      <QrReader
        handleOnDecode={handleOnDecode}
        handleClose={handleCloseCamera}
      />
    );
  }

  return (
    <Box sx={{ ...styles.container, margin: 3 }}>
      <BackdropLoader submissionState={submissionState} />
      {nEtherBal === 0 ? <InsufficientEthAlert /> : null}
      <FormHeader title="Whitelisting" />
      <WhitelistingForm toggleCamera={toggleCamera} />
    </Box>
  );
}
