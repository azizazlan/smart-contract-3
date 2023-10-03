import React from 'react';
import Box from '@mui/material/Box';
import styles from './styles';
import { Navigate } from 'react-router-dom';
import { OfficialState } from '../../../services/store';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import checkStatus from '../../../services/official/thunks/checkStatus';
import Balance from './Balance';
import Status from './Status';
import ethBal from '../../../services/official/thunks/ethBal';
import initialize from '../../../services/official/thunks/initialize';

// Official info page
export default function Info() {
  const dispatch = useOfficialDispatch();
  const {
    publicKey,
    seedPhrase,
    nric,
    etherBal,
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

  const handleReloadStatus = () => {
    dispatch(
      checkStatus({
        checkOfficer: true,
        publicKey: publicKey as string,
        nric: nric as string,
      })
    );
  };

  const handleReloadBal = () => {
    dispatch(
      ethBal({
        publicKey: publicKey as string,
      })
    );
  };

  return (
    <Box sx={styles.container}>
      <Box sx={{ marginTop: 3 }}>
        <Status
          nric={nric || 'NA'}
          hasResidentId={hasResidentId}
          hasMinterRole={hasMinterRole}
          handleReloadStatus={handleReloadStatus}
        />
        <Balance
          publicKey={publicKey || 'NA'}
          etherBal={etherBal}
          tokenAllowances={tokenAllowances}
          handleReloadBal={handleReloadBal}
        />
      </Box>
    </Box>
  );
}
