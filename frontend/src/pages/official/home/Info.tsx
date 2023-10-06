import React from 'react';
import Box from '@mui/material/Box';
import styles from './styles';
import { Navigate } from 'react-router-dom';
import { OfficialState } from '../../../services/store';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import Balance from './Balance';
import Status from './Status';
import initialize from '../../../services/official/thunks/initialize';

// Official info page
export default function Info() {
  const dispatch = useOfficialDispatch();
  const {
    publicKey,
    seedPhrase,
    nric,
    hasResidentId,
    hasMinterRole,
    tokenAllowances,
  } = useOfficialSelector((state: OfficialState) => state.official);

  React.useEffect(() => {
    dispatch(initialize());
  }, []);

  if (!publicKey && !seedPhrase && !nric) {
    return <Navigate to="/official" />;
  }

  return (
    <Box sx={{ ...styles.container, marginTop: 3 }}>
      <Status
        publicKey={publicKey || 'NA'}
        nric={nric || 0}
        hasResidentId={hasResidentId}
        hasMinterRole={hasMinterRole}
      />
      <Balance tokenAllowances={tokenAllowances} />
    </Box>
  );
}
