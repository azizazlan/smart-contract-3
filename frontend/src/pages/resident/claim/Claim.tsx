import Box from '@mui/material/Box';
import styles from './styles';
import ClaimForm from './ClaimForm';
import FormHeader from '../../../commons/FormHeader';

export default function Claim() {
  return (
    <Box sx={styles.container}>
      <FormHeader title="Claim" />
      <ClaimForm />
    </Box>
  );
}
