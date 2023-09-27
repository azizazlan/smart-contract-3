import React from 'react';
import Box from '@mui/material/Box';
import styles from './styles';
import {
  useResidentDispatch,
  useResidentSelector,
} from '../../../services/hook';
import { ResidentState } from '../../../services/store';
import { Navigate } from 'react-router-dom';
import whitelistStat from '../../../services/resident/thunks/whitelistStat';
import Balance from './Balance';
import Status from './Status';
import checkStatus from '../../../services/resident/thunks/checkStatus';

export default function Info() {
  const dispatch = useResidentDispatch();
  const {
    publicKey,
    seedPhrase,
    isResident,
    isWhitelisted,
    nric,
    ftRiceBalance,
  } = useResidentSelector((state: ResidentState) => state.resident);

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

  const handleReloadBal = () => {};

  const handleReloadResidentStat = () => {
    if (!nric || !publicKey) {
      return;
    }
    dispatch(checkStatus({ nric, publicKey }));
  };

  const handleReloadWhitelistStat = () => {};

  return (
    <Box sx={{ ...styles.container, marginTop: 3 }}>
      <Status
        nric={nric || 'Error'}
        isResident={isResident}
        handleReloadResidentStat={handleReloadResidentStat}
        isWhitelisted={isWhitelisted}
        handleReloadWhitelistStat={handleReloadWhitelistStat}
      />
      <Balance
        ftBal={ftRiceBalance.toString()}
        publicKey={publicKey || ''}
        handleReloadBal={handleReloadBal}
      />
    </Box>
  );
}
