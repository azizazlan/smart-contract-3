import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { useMerchantDispatch, useMerchantSelector } from '../../services/hook';
import { MerchantState } from '../../services/store';
import initialize from '../../services/merchant/thunks/initialize';
import signup from '../../services/merchant/thunks/signup';
import BackdropLoader from '../../commons/BackdropLoader';
import Header from './Header';
import Transactions from './Transactions';

export default function Home() {
  const dispatch = useMerchantDispatch();
  const { submissionState, submissionMsg, publicKey, seedPhrase } =
    useMerchantSelector((state: MerchantState) => state.merchant);

  React.useEffect(() => {
    dispatch(initialize());
  }, []);

  const handleSignup = () => {
    dispatch(signup());
  };

  if (submissionState === 'PENDING') {
    return (
      <BackdropLoader
        message="Signup merchant account..."
        submissionState={submissionState}
      />
    );
  }

  if (
    (submissionState === 'FAILED' && submissionMsg) ||
    !publicKey ||
    !seedPhrase
  ) {
    return (
      <Box sx={{ width: '100%', margin: 1 }}>
        <Card sx={{ minWidth: 275, backgroundColor: '#f5f6fa' }}>
          <CardHeader
            title="Merchant signup"
            subheader="Ethereum account"
            sx={{ color: '#273c75' }}
          />
          <CardContent>{submissionMsg}</CardContent>
          <CardActions sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="contained" onClick={handleSignup}>
              signup
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      <Header publicKey={publicKey} />
      <Transactions />
    </Box>
  );
}
