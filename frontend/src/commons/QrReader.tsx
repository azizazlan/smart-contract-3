import { Box, Button } from '@mui/material';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { isMobile } from 'react-device-detect';

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
