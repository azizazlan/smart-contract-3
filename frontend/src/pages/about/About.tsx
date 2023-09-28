import Box from '@mui/material/Box';
import styles from './styles';
import { Alert, Typography } from '@mui/material';
import flag from '../../assets/malacca-flag.png';
import truncateEthAddr from '../../utils/truncateEthAddr';

const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

const MELAKA_RICE_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RICE;

export default function About() {
  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <img src={flag} alt="melaka flag" style={{ width: '175px' }} />
      </Box>
      <Alert
        severity="warning"
        icon={false}
        sx={{ marginBottom: 2, marginTop: -2, zIndex: -10 }}
      >
        This is <b>not</b> a production release, and should only be used for
        demo and testing.
      </Alert>
      <Typography variant="body2" gutterBottom>
        Melaka EquiSubsidy is a basic DApp to demonstrate the use of smart
        contracts to regulate the distribution of subsidised items to the
        residents of Melaka.
      </Typography>
      <br />
      <Typography variant="body2" gutterBottom>
        Smart contract MelakaResident ERC721:
      </Typography>
      <Typography style={{ fontFamily: 'Abel', fontSize: '12.5pt' }}>
        {truncateEthAddr(MELAKA_RESIDENT_CONTRACT_ADDR)}
      </Typography>
      <br />
      <Typography variant="body2" gutterBottom>
        Smart contract MelakaRice ERC20:
      </Typography>
      <Typography style={{ fontFamily: 'Abel', fontSize: '12.5pt' }}>
        {truncateEthAddr(MELAKA_RICE_CONTRACT_ADDR)}
      </Typography>
      <br />
      <Typography variant="body2" gutterBottom>
        Demo solution built for,
        <br />
        <b>Jabatan Ketua Menteri Melaka, Malaysia.</b>
        <br />
        Version 0.0.1
      </Typography>
    </Box>
  );
}
