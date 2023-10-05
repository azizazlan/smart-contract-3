import React from 'react';
import Box from '@mui/material/Box';
import styles from './styles';
import {
  useResidentDispatch,
  useResidentSelector,
} from '../../../services/hook';
import { ResidentState } from '../../../services/store';
import { Navigate } from 'react-router-dom';
import Balance from './Balance';
import Status from './Status';
// import checkStatus from '../../../services/resident/thunks/checkStatus';
import initialize from '../../../services/resident/thunks/initialize';
import QrDialog from '../../../layouts/resident/QrDialog';
import { getBalances } from '../../../utils/subsidyUtils';

export default function Info() {
  const dispatch = useResidentDispatch();
  const {
    publicKey,
    seedPhrase,
    hasResidentId,
    isWhitelisted,
    nric,
    qrcode,
    transactions,
  } = useResidentSelector((state: ResidentState) => state.resident);

  const [openQrCode, setOpenQrCode] = React.useState(false);

  React.useEffect(() => {
    dispatch(initialize());
  }, []);

  const tokenBalances = getBalances(transactions);

  const toggleQrCode = () => {
    setOpenQrCode((o) => !o);
  };

  // const handleReloadBal = () => {};

  // const handleReloadResidentStat = () => {
  //   if (!nric || !publicKey) {
  //     return;
  //   }
  //   dispatch(checkStatus({ nric, publicKey }));
  // };

  if (!publicKey && !seedPhrase) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ ...styles.container, marginTop: 3 }}>
      <QrDialog qrcode={qrcode} open={openQrCode} handleClose={toggleQrCode} />
      <Status
        publicKey={publicKey || ''}
        nric={nric}
        hasResidentId={hasResidentId}
        isWhitelisted={isWhitelisted}
        handleClickAvatar={toggleQrCode}
      />
      <Balance tokenBalances={tokenBalances} />
    </Box>
  );
}
