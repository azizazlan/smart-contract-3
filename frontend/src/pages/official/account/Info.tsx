import React from 'react';
import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import styles from './styles';
import { Navigate } from 'react-router-dom';
import { OfficialState } from '../../../services/store';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import ethLogo from '../../../assets/eth-logo.png';
import residentialStatus from '../../../services/official/thunks/residentialStat';

function Balance({
  etherBal,
  publicKey,
}: {
  etherBal: string;
  publicKey: string;
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '17px',
          alignItems: 'center',
        }}
      >
        <img src={ethLogo} alt="Eth logo" style={{ width: '95px' }} />
        <Typography
          style={{
            fontFamily: 'Abel',
            fontSize: '11.5pt',
            marginTop: '0px',
            marginBottom: '5px',
          }}
        >
          {publicKey}
        </Typography>
        <Typography
          style={{
            fontFamily: 'Abel',
            fontSize: '12pt',
            fontWeight: 'bold',
            color: 'silver',
            marginTop: '15px',
          }}
        >
          Ether Balance
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
          {etherBal}
        </Typography>
      </Box>
    </Box>
  );
}

function RoleStatus({
  nric,
  isResident,
  handleReloadResidentStat,
}: {
  nric: string;
  isResident: boolean;
  handleReloadResidentStat: () => void;
}) {
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
        Residential status
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        <Typography
          style={{
            fontFamily: 'Abel',
            fontSize: '21pt',
          }}
        >
          {isResident ? `Resident` : `Non-resident`}
        </Typography>
        <IconButton onClick={handleReloadResidentStat}>
          <ReplayIcon color="primary" />
        </IconButton>
      </Box>

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
        Role
      </Typography>
      <Typography
        style={{
          fontFamily: 'Abel',
          fontSize: '21pt',
          marginTop: '-9px',
        }}
      >
        Officer | No role
      </Typography>
    </Box>
  );
}

// Official info page
export default function Info() {
  const dispatch = useOfficialDispatch();
  const { publicKey, seedPhrase, nric, etherBal, isResident } =
    useOfficialSelector((state: OfficialState) => state.official);

  if (!publicKey && !seedPhrase && !nric) {
    return <Navigate to="/official" />;
  }

  const handleReloadResidentStat = () => {
    if (!publicKey && !nric) {
      return;
    }
    dispatch(
      residentialStatus({
        publicKey: publicKey as string,
        nric: nric as string,
      })
    );
  };

  return (
    <Box sx={styles.container}>
      <RoleStatus
        nric={nric || 'NA'}
        isResident={isResident}
        handleReloadResidentStat={handleReloadResidentStat}
      />
      <Balance publicKey={publicKey || 'NA'} etherBal={etherBal} />
    </Box>
  );
}
