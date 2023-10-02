import { Box, Button, Typography } from '@mui/material';
import { isMobile } from 'react-device-detect';
import styles from './styles';

type ScanErrorProps = {
  handleCancel: () => void;
  handleScanAgain: () => void;
};

export default function ScanError(props: ScanErrorProps) {
  const { handleCancel, handleScanAgain } = props;

  return (
    <Box sx={styles.container}>
      <Typography>Error</Typography>
      <Box sx={isMobile ? styles.mobileFormButtons : styles.formButtons}>
        <Button
          fullWidth={isMobile ? true : false}
          variant="outlined"
          onClick={handleCancel}
        >
          cancel
        </Button>
        <Box sx={{ width: 7, height: 7 }} />
        <Button
          fullWidth={isMobile ? true : false}
          variant="contained"
          onClick={handleScanAgain}
        >
          scan again
        </Button>
      </Box>
    </Box>
  );
}
