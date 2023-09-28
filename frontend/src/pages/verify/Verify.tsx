import Box from '@mui/material/Box';
import styles from './styles';
import VerificationForm from './VerificationForm';

export default function Verify() {
  return (
    <Box sx={styles.container}>
      <VerificationForm />
    </Box>
  );
}
