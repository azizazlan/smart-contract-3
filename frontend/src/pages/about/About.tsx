import Box from '@mui/material/Box';
import styles from './styles';
import { Typography } from '@mui/material';
import flag from '../../assets/malacca-flag.png';

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
        <img src={flag} alt="melaka flag" style={{ width: '275px' }} />
      </Box>
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
        {MELAKA_RESIDENT_CONTRACT_ADDR}
      </Typography>
      <br />
      <Typography variant="body2" gutterBottom>
        Smart contract MelakaRice ERC20:
      </Typography>
      <Typography style={{ fontFamily: 'Abel', fontSize: '12.5pt' }}>
        {MELAKA_RICE_CONTRACT_ADDR}
      </Typography>
      <br />
      <Typography variant="body2" gutterBottom>
        Built for,
        <br />
        <b>Jabatan Ketua Menteri Melaka, Malaysia.</b>
        <br />
        Version 0.0.1
      </Typography>
    </Box>
  );
}
