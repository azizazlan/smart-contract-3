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
import hasRole from '../../../services/official/thunks/hasRole';
import Balance from './Balance';
import Status from './Status';
import ethBal from '../../../services/official/thunks/ethBal';
import initialize from '../../../services/official/thunks/initialize';
import allowanceTokens from '../../../services/official/thunks/allowanceTokens';

// Official info page
export default function Info() {
  const dispatch = useOfficialDispatch();
  const {
    publicKey,
    seedPhrase,
    nric,
    etherBal,
    isResident,
    isOfficer,
    allowTokens,
  } = useOfficialSelector((state: OfficialState) => state.official);

  React.useEffect(() => {
    dispatch(initialize());
  }, []);

  if (!publicKey && !seedPhrase && !nric) {
    return <Navigate to="/official" />;
  }

  const handleReloadResidentStat = () => {
    dispatch(
      checkStatus({
        checkOfficer: true,
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

  const handleReloadBal = () => {
    dispatch(
      ethBal({
        publicKey: publicKey as string,
      })
    );
  };

  const handleAllowsBal = () => {
    if (!publicKey) {
      console.log('Could not dispatch because publicKey is null');
      return;
    }
    dispatch(
      allowanceTokens({
        publicKey,
      })
    );
  };

  return (
    <Box sx={styles.container}>
      <Box sx={{ marginTop: 3 }}>
        <Status
          nric={nric || 'NA'}
          isResident={isResident}
          handleReloadResidentStat={handleReloadResidentStat}
          isOfficer={isOfficer}
          handleReloadRole={handleReloadRole}
        />
        <Balance
          publicKey={publicKey || 'NA'}
          etherBal={etherBal}
          handleReloadBal={handleReloadBal}
          allowTokens={allowTokens}
          handleAllowsBal={handleAllowsBal}
        />
      </Box>
    </Box>
  );
}
