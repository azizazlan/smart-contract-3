import { Box, Button } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { QrScanner } from '@yudiel/react-qr-scanner';

type QrReaderProps = {
  handleOnDecode: (resut: any) => void;
  handleClose: () => void;
};

export default function QrReader(props: QrReaderProps) {
  const { handleOnDecode, handleClose } = props;
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
        onDecode={(result: any) => handleOnDecode(result)}
        onError={(error: any) => console.log(error?.message)}
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
          onClick={handleClose}
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
          onClick={handleClose}
        >
          close scanner
        </Button>
      )}
    </Box>
  );
}
