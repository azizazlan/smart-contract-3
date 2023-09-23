import React from 'react';
import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import cw from '@mui/icons-material/Check';
import styles from './styles';
import { Navigate } from 'react-router-dom';
import { OfficialState } from '../../../services/store';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import ethLogo from '../../../assets/eth-logo.png';
import residentialStatus from '../../../services/official/thunks/residentialStat';
import hasRole from '../../../services/official/thunks/hasRole';

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
            fontFamily: 'Oswald',
            fontSize: '12pt',
            color: 'silver',
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
  isOfficer,
  handleReloadRole,
}: {
  nric: string;
  isResident: boolean;
  handleReloadResidentStat: () => void;
  isOfficer: boolean;
  handleReloadRole: () => void;
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
          fontFamily: 'Oswald',
          fontSize: '12pt',
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
          fontFamily: 'Oswald',
          fontSize: '12pt',
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
            fontFamily: 'Oswald',
            fontSize: '15pt',
          }}
        >
          {isResident ? `Resident ✔` : `Non-resident`}
        </Typography>
        <IconButton onClick={handleReloadResidentStat}>
          <ReplayIcon color="secondary" fontSize="small" />
        </IconButton>
      </Box>

      <Typography
        style={{
          fontFamily: 'Oswald',
          fontSize: '12pt',
          color: 'silver',
          marginRight: '3px',
          marginTop: '4px',
        }}
      >
        Role
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        <Typography
          style={{
            fontFamily: 'Oswald',
            fontSize: '15pt',
          }}
        >
          {isOfficer ? `Officer ✔` : `Pending appointment`}
        </Typography>
        <IconButton onClick={handleReloadRole}>
          <ReplayIcon color="secondary" fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

// Official info page
export default function Info() {
  const dispatch = useOfficialDispatch();
  const { publicKey, seedPhrase, nric, etherBal, isResident, isOfficer } =
    useOfficialSelector((state: OfficialState) => state.official);

  if (!publicKey && !seedPhrase && !nric) {
    return <Navigate to="/official" />;
  }

  const handleReloadResidentStat = () => {
    dispatch(
      residentialStatus({
        publicKey: publicKey as string,
        nric: nric as string,
      })
    );
  };

  const handleReloadRole = () => {
    dispatch(
      hasRole({
        publicKey: publicKey as string,
      })
    );
  };

  return (
    <Box sx={styles.container}>
      <RoleStatus
        nric={nric || 'NA'}
        isResident={isResident}
        handleReloadResidentStat={handleReloadResidentStat}
        isOfficer={isOfficer}
        handleReloadRole={handleReloadRole}
      />
      <Balance publicKey={publicKey || 'NA'} etherBal={etherBal} />
    </Box>
  );
}
