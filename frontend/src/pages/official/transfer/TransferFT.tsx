import React from 'react';
import TransferFTForm from './TransferFTForm';
import ScanError from '../../../commons/ScanError';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import {
  resetSubmissionState,
  setClaimantNricPublicKey,
} from '../../../services/official/reducer';
import QrReader from '../../../commons/QrReader';
import { OfficialState } from '../../../services/store';
import ErrResult from './ErrResult';
import { Box } from '@mui/material';
import BackdropLoader from '../../../commons/BackdropLoader';
import styles from './styles';

// Transfer FT page
export default function TransferFT() {
  const dispatch = useOfficialDispatch();
  const { submissionState, submissionMsg } = useOfficialSelector(
    (state: OfficialState) => state.official
  );
  const [camera, setCamera] = React.useState(false);
  const [error, setError] = React.useState(false);

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

  const handleScanAgain = () => {
    setError((o) => !o);
    setCamera((o) => !o);
  };

  const handleCancelScan = () => {
    setError((o) => !o);
  };

  const toggleCamera = () => {
    setCamera(true);
    setError(false);
  };

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

  if (submissionState === 'FAILED' && submissionMsg) {
    return <ErrResult message={submissionMsg} />;
  }

  return (
    <Box sx={{ ...styles.container, margin: 0 }}>
      <BackdropLoader submissionState={submissionState} />
      <TransferFTForm toggleCamera={toggleCamera} />;
    </Box>
  );
}
