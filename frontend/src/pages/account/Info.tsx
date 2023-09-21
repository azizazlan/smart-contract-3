import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import styles from './styles';
import nonResidentImg from '../../assets/resident-non.png';
import residentImg from '../../assets/resident-ok.png';
import riceIcon from '../../assets/rice.svg';
import emptyBox from '../../assets/empty-box.png';

function Balance() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '25px',
      }}
    >
      <Typography
        style={{
          fontFamily: 'Abel',
          fontSize: '12pt',
          fontWeight: 'bold',
          color: 'silver',
          marginRight: '3px',
          marginTop: '15px',
          marginBottom: '0px',
        }}
      >
        SUBSIDISED ITEMS
      </Typography>
      <Avatar
        sx={{ width: 135, height: 135, color: 'silver' }}
        src={riceIcon}
        // src={emptyBox}
        alt="rice icon"
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '-17px',
          alignItems: 'center',
        }}
      >
        <Typography
          style={{
            fontFamily: 'Abel',
            fontSize: '12pt',
            fontWeight: 'bold',
            color: 'silver',
            marginTop: '15px',
          }}
        >
          Balance
        </Typography>
        <Typography
          style={{
            fontFamily: 'Abel',
            fontSize: '27pt',
            fontWeight: 'bold',
            marginTop: '-10px',
            marginBottom: '15px',
          }}
        >
          0
        </Typography>
      </Box>
    </Box>
  );
}

function ResidentAvatar() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '35px',
      }}
    >
      <img
        style={{ width: '95px' }}
        src={residentImg}
        // src={nonResidentImg}
        alt="non resident icon"
      />
    </Box>
  );
}

function Nric() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '9px',
      }}
    >
      <Typography
        style={{
          fontFamily: 'Abel',
          fontSize: '12pt',
          fontWeight: 'bold',
          color: 'silver',
          marginRight: '3px',
          marginTop: '4px',
        }}
      >
        NRIC
      </Typography>
      <Typography
        style={{
          fontFamily: 'Abel',
          fontSize: '21pt',
          fontWeight: 'bold',
          marginTop: '-9px',
        }}
      >
        7777881234
      </Typography>
    </Box>
  );
}

export default function Info() {
  return (
    <Box sx={styles.container}>
      <ResidentAvatar />
      <Nric />
      <Balance />
    </Box>
  );
}
