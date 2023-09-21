import Box from '@mui/material/Box';
import styles from './styles';
import { Typography } from '@mui/material';
import flag from '../../assets/malacca-flag.png';

export default function About() {
  return (
    <Box sx={styles.container}>
      <Typography
        color="primary"
        sx={{ fontFamily: 'Oswald', fontSize: '15pt' }}
      >
        About
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <img src={flag} alt="melaka flag" style={{ width: '275px' }} />
      </Box>
      <Typography variant="body2" gutterBottom>
        Melaka FairSubsidy is a basic DApp to demonstrate the use of smart
        contracts to regulate the distribution of subsidised items to the
        residents of Melaka.
      </Typography>
      <Typography variant="body2">Version 0.1</Typography>
    </Box>
  );
}
