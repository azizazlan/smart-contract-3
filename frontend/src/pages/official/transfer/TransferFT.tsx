import React from 'react';
import TransferFTForm from './TransferFTForm';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { isMobile } from 'react-device-detect';

// Transfer FT page
export default function TransferFT() {
  const [camera, setCamera] = React.useState(false);

  if (camera) {
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
          onDecode={(result) => console.log(result)}
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

  return <TransferFTForm toggleCamera={() => setCamera((o) => !o)} />;
}
