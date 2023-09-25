import Box from '@mui/material/Box';
import styles from './styles';
import { Navigate } from 'react-router-dom';
import { OfficialState } from '../../../services/store';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import residentialStatus from '../../../services/official/thunks/residentialStat';
import hasRole from '../../../services/official/thunks/hasRole';
import Balance from './Balance';
import Status from './Status';
import ethBal from '../../../services/official/thunks/ethBal';

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

  const handleReloadBal = () => {
    dispatch(
      ethBal({
        publicKey: publicKey as string,
      })
    );
  };

  return (
    <Box sx={styles.container}>
      <Box sx={{ marginTop: 5 }}>
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
        />
      </Box>
    </Box>
  );
}
