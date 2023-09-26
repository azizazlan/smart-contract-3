import Box from '@mui/material/Box';
import FormHeader from '../../../commons/FormHeader';
import styles from '../residency/styles';
import WhitelistingForm from './WhitelistingForm';

export default function Whitelisting() {
  return (
    <Box sx={{ ...styles.container, margin: 3 }}>
      <FormHeader title="Whitelisting" />
      <WhitelistingForm />
    </Box>
  );
}
