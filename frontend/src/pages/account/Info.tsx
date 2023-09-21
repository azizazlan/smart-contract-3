import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import styles from './styles';
import nonResidentImg from '../../assets/resident-non.png';
import residentImg from '../../assets/resident-ok.png';
import riceIcon from '../../assets/rice.svg';
import emptyBox from '../../assets/empty-box.png';
import QrCodeDlg from '../../dialogs/QrCodeDlg';
import {
  useResidentAccDispatch,
  useResidentAccSelector,
} from '../../services/hook';
import { ResidentAccState } from '../../services/store';
import { Navigate } from 'react-router-dom';
import whitelistStat from '../../services/residentAccount/thunks/whitelistStat';

function Balance({
  isWhitelisted,
  ftRiceBalance,
}: {
  isWhitelisted: boolean;
  ftRiceBalance: number;
}) {
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
        src={isWhitelisted ? riceIcon : emptyBox}
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
          {ftRiceBalance}
        </Typography>
      </Box>
    </Box>
  );
}

function ResidentAvatar({ isWhitelisted }: { isWhitelisted: boolean }) {
  const [openQrCode, setOpenQrCode] = React.useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '35px',
      }}
    >
      <QrCodeDlg
        open={openQrCode}
        handleClose={() => setOpenQrCode((o) => !o)}
      />
      <img
        style={{ width: '95px' }}
        src={isWhitelisted ? residentImg : nonResidentImg}
        alt="non resident icon"
        onClick={() => setOpenQrCode((o) => !o)}
      />
    </Box>
  );
}

function Nric({ nric }: { nric: string }) {
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
        {nric}
      </Typography>
    </Box>
  );
}

export default function Info() {
  const dispatch = useResidentAccDispatch();
  const { publicKey, seedPhrase, isWhitelisted, nric, ftRiceBalance } =
    useResidentAccSelector((state: ResidentAccState) => state.residentAcc);

  if (!publicKey && !seedPhrase) {
    return <Navigate to="/" />;
  }

  React.useEffect(() => {
    let pollingInterval: any;

    const fetchWhitelistStatus = async () => {
      dispatch(whitelistStat());
    };

    // Stop polling when isWhitelisted is true
    if (isWhitelisted) {
      clearInterval(pollingInterval);
    }

    // Set up a timer to fetch the variable periodically (e.g., every 5 seconds)
    pollingInterval = setInterval(fetchWhitelistStatus, 5000); // 5000 milliseconds

    // Clean up the timer when the component unmounts
    return () => clearInterval(pollingInterval);
  }, []);

  return (
    <Box sx={styles.container}>
      <ResidentAvatar isWhitelisted={isWhitelisted} />
      <Nric nric={nric || 'NA'} />
      <Balance isWhitelisted={isWhitelisted} ftRiceBalance={ftRiceBalance} />
    </Box>
  );
}
