import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import styles from './styles';
import { useAdminDispatch, useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import metamaskInfo from '../../services/admin/thunks/metamaskInfo';
import { Link } from 'react-router-dom';
import truncateEthAddr from '../../utils/truncateEthAddr';

const schema = Yup.object().shape({
  publicKey: Yup.string()
    .required('Please key the resident public key')
    .matches(
      /^(0x)?[0-9a-fA-F]{40}$/u,
      'Invalid Ethereum public key or address'
    ),
  units: Yup.number().required('Please key in units to transfer'),
});

type TransferTokenFormFields = {
  publicKey: string;
  units: number;
};

export default function TransferTokenForm() {
  const dispatch = useAdminDispatch();
  const { privateKey, isGomenOfficer } = useAdminSelector(
    (state: AdminState) => state.admin
  );

  React.useEffect(() => {
    if (!privateKey) {
      console.log('private key is null');
      return;
    }
    dispatch(metamaskInfo({ privateKey }));
  }, []);

  const { publicKey } = useAdminSelector((state: AdminState) => state.admin);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferTokenFormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      publicKey: '',
      units: 0,
    },
  });

  const onSubmit: SubmitHandler<TransferTokenFormFields> = (data) => {
    const { publicKey } = data;
    // dispatch(applyPrivateKey({ privateKey }));
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Box sx={{ ...styles.container, marginTop: 3 }}>
      <form
        style={styles.form}
        id="admin_transfer_token"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 0,
            alignItems: 'center',
          }}
        >
          {publicKey ? (
            <Box sx={{ minHeight: '55px' }}>
              <Jazzicon diameter={55} seed={jsNumberForAddress(publicKey)} />
            </Box>
          ) : (
            <Box sx={{ minHeight: '55px' }}>
              {publicKey ? <CircularProgress color="secondary" /> : null}
            </Box>
          )}
          <Typography sx={{ marginLeft: 1 }}>
            {publicKey ? truncateEthAddr(publicKey) : '...'}
          </Typography>
          {isGomenOfficer ? (
            <Typography
              sx={{
                marginLeft: 1,
                marginBottom: 0.5,
                fontFamily: 'Oswald',
                fontSize: '11pt',
                color: 'navy',
              }}
            >
              ✓ Smart contracts owner
            </Typography>
          ) : (
            <Typography
              sx={{
                marginLeft: 1,
                marginBottom: 0.5,
                fontFamily: 'Oswald',
                fontSize: '11pt',
                color: 'navy',
              }}
            >
              <span style={{ color: 'red' }}>✖</span> Not smart contract owner
            </Typography>
          )}
        </Box>
        <Typography
          variant="body2"
          color="primary"
          sx={{ fontFamily: 'Oswald', marginTop: 2, marginBottom: 1 }}
        >
          This page allows you to transfer MelakaRice (ERC20) token to a state
          officer.
        </Typography>
        <FormControl fullWidth margin="dense">
          <Controller
            name="publicKey"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                InputLabelProps={{ shrink: true }}
                id="publicKey"
                label="Recipient public Key"
                variant="outlined"
                {...field}
              />
            )}
          />
          {errors.publicKey ? (
            <FormHelperText error>{errors.publicKey.message}</FormHelperText>
          ) : (
            <FormHelperText>Recipient public key</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="dense">
          <Controller
            name="units"
            defaultValue={1}
            control={control}
            render={({ field }) => (
              <TextField
                InputLabelProps={{ shrink: true }}
                id="publicKey"
                label="No of tokens"
                variant="outlined"
                {...field}
              />
            )}
          />
          {errors.publicKey ? (
            <FormHelperText error>{errors.units?.message}</FormHelperText>
          ) : (
            <FormHelperText>Number of token to transfer</FormHelperText>
          )}
        </FormControl>
      </form>
      <Box sx={styles.formButtons}>
        <Box sx={{ flexGrow: 1 }} />
        <Button component={Link} to="/admin">
          close
        </Button>
        <Box sx={{ width: 12 }} />
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          reset
        </Button>
        <Box sx={{ width: 12 }} />
        <Button
          color="primary"
          type="submit"
          form="admin_account_private_key"
          variant="contained"
        >
          transfer
        </Button>
      </Box>
    </Box>
  );
}
