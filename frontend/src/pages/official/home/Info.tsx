import React, { lazy } from 'react';
import Box from '@mui/material/Box';
import styles from './styles';
import { Navigate } from 'react-router-dom';
import { OfficialState } from '../../../services/store';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
const Balance = lazy(() => import('./Balance'));
const Status = lazy(() => import('./Status'));
// import Balance from './Balance';
// import Status from './Status';
import initialize from '../../../services/official/thunks/initialize';
import QrDialog from '../../../commons/QrDialog';

// Official info page
export default function Info() {
  const dispatch = useOfficialDispatch();
  const {
    qrcode,
    publicKey,
    seedPhrase,
    nric,
    hasResidentId,
    hasMinterRole,
    tokenAllowances,
  } = useOfficialSelector((state: OfficialState) => state.official);

  const [openQrCode, setOpenQrCode] = React.useState(false);

  React.useEffect(() => {
    dispatch(initialize());
  }, []);

  if (!publicKey && !seedPhrase && !nric) {
    return <Navigate to="/official" />;
  }

  const toggleQrCode = () => {
    setOpenQrCode((o) => !o);
  };

  return (
    <Box sx={{ ...styles.container, marginTop: 3 }}>
      <QrDialog
        appBackgroundColor="black"
        qrcode={qrcode}
        open={openQrCode}
        handleClose={toggleQrCode}
      />
      <Status
        publicKey={publicKey || 'NA'}
        nric={nric || 0}
        hasResidentId={hasResidentId}
        hasMinterRole={hasMinterRole}
        handleClickAvatar={toggleQrCode}
      />
      <Balance tokenAllowances={tokenAllowances} />
    </Box>
  );
}
