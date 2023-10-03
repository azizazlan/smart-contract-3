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
import applyPrivateKey from '../../services/admin/thunks/applyPrivateKey';
import { Link } from 'react-router-dom';
import truncateEthAddr from '../../utils/truncateEthAddr';

const schema = Yup.object().shape({
  privateKey: Yup.string().required('Please key the private key'),
});

type AdminAccountFprmFields = {
  privateKey: string;
};

export default function AccountForm() {
  const dispatch = useAdminDispatch();
  const { privateKey, hasMinterRole } = useAdminSelector(
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
  } = useForm<AdminAccountFprmFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      privateKey: '',
    },
  });

  const onSubmit: SubmitHandler<AdminAccountFprmFields> = (data) => {
    const { privateKey } = data;
    dispatch(applyPrivateKey({ privateKey }));
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Box sx={{ ...styles.container, marginTop: 3 }}>
      <form
        style={styles.form}
        id="admin_account_private_key"
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
          {hasMinterRole ? (
            <Typography
              sx={{
                marginLeft: 1,
                marginBottom: 0.5,
                fontFamily: 'Oswald',
                fontSize: '11pt',
                color: 'navy',
              }}
            >
              ✓ has a role over smart contracts
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
              <span style={{ color: 'red' }}>✖</span> does not have a role :(
            </Typography>
          )}
        </Box>
        <FormControl fullWidth margin="normal">
          <Controller
            name="privateKey"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                InputLabelProps={{ shrink: true }}
                id="privateKey"
                label="Private Key"
                variant="outlined"
                {...field}
              />
            )}
          />
          <Box sx={{ minHeight: 46 }}>
            {errors.privateKey ? (
              <FormHelperText error>{errors.privateKey.message}</FormHelperText>
            ) : (
              <FormHelperText>Admin private key</FormHelperText>
            )}
          </Box>
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
          apply
        </Button>
      </Box>
    </Box>
  );
}
