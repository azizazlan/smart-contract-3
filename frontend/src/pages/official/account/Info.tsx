import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import styles from './styles';
import { Navigate } from 'react-router-dom';
import { OfficialState } from '../../../services/store';
import { useOfficialSelector } from '../../../services/hook';
import ethLogo from '../../../assets/eth-logo.png';

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

function RoleStatus({ nric }: { nric: string }) {
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
      <Typography
        style={{
          fontFamily: 'Abel',
          fontSize: '21pt',
          marginTop: '-9px',
        }}
      >
        Resident | Non-resident
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

export default function Info() {
  const { publicKey, seedPhrase, nric, etherBal } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  if (!publicKey && !seedPhrase) {
    return <Navigate to="/official" />;
  }

  return (
    <Box sx={styles.container}>
      <RoleStatus nric={nric || 'NA'} />
      <Balance publicKey={publicKey || 'NA'} etherBal={etherBal} />
    </Box>
  );
}
