import React from 'react';
import { Box, Button } from '@mui/material';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { isMobile } from 'react-device-detect';
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
import {
  resetSubmissionState,
  setClaimantNricPublicKey,
} from '../../../services/official/reducer';
import ScanError from '../../../commons/ScanError';

export default function Verification() {
  const [camera, setCamera] = React.useState(false);
  const [error, setError] = React.useState(false);
  const dispatch = useOfficialDispatch();
  const { submissionState, submissionMsg } = useOfficialSelector(
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

  if (submissionState === 'OK' && submissionMsg) {
    return <Result />;
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
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <QrScanner
          onDecode={(result) => handleOnDecode(result)}
          onError={(error) => console.log(error?.message)}
        />
        {!isMobile ? (
          <Button
            variant="outlined"
            sx={{
              zIndex: 10,
              position: 'absolute',
              bottom: 70,
              backgroundColor: 'white',
              color: 'black',
            }}
            onClick={() => setCamera((o) => !o)}
          >
            close scanner
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{
              zIndex: 10,
              position: 'absolute',
              bottom: 70,
            }}
            onClick={() => setCamera((o) => !o)}
          >
            close scanner
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ ...styles.container, margin: 3 }}>
      <BackdropLoader submissionState={submissionState} />
      <FormHeader title="Verify resident" />
      <VerificationForm toggleCamera={toggleCamera} />
    </Box>
  );
}
