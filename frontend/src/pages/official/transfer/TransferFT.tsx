import React from 'react';
import TransferFTForm from './TransferFTForm';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { isMobile } from 'react-device-detect';
import ScanError from './ScanError';
import { useOfficialDispatch } from '../../../services/hook';
import { setClaimantNricPublicKey } from '../../../services/official/reducer';

// Transfer FT page
export default function TransferFT() {
  const dispatch = useOfficialDispatch();
  const [camera, setCamera] = React.useState(false);
  const [error, setError] = React.useState(false);

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

  return <TransferFTForm toggleCamera={toggleCamera} />;
}
