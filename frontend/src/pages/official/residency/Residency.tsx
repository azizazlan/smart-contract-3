import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import styles from './styles';

const schema = Yup.object().shape({
  nric: Yup.string()
    .required('Please key in your NRIC')
    .test('valid-nric', 'NRIC must be at least 12 digits numbers', (value) => {
      if (!value) return false; // Skip validation if the value is empty or undefined
      return /^[0-9]{12,}$/.test(value);
    }),
  publicKey: Yup.string()
    .required('Please key the resident public key')
    .matches(
      /^(0x)?[0-9a-fA-F]{40}$/u,
      'Invalid Ethereum public key or address'
    ),
});

type ResidentAwardFields = {
  nric: string;
  publicKey: string;
};

export default function Residency() {
  const [toRevoke, setToRevoke] = React.useState(false);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResidentAwardFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      nric: '',
      publicKey: '',
    },
  });

  const onSubmit: SubmitHandler<ResidentAwardFields> = (data) => {
    const { nric, publicKey } = data;
    console.log(`${nric}-${publicKey}`);
    if (toRevoke) {
      console.log('to revoke!');
      return;
    }
    console.log('award!');
  };

  const handleReset = () => {
    setToRevoke(false);
    reset();
  };

  return (
    <Box sx={{ ...styles.container, margin: 3 }}>
      <Typography variant="h5" color="primary">
        Residency status
      </Typography>
      <form id="official_residency_status" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <Controller
            name="nric"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                placeholder="34567891011"
                InputLabelProps={{ shrink: true }}
                label="Official NRIC"
                id="nric"
                {...field}
              />
            )}
          />
          {errors.nric ? (
            <FormHelperText error>{errors.nric.message}</FormHelperText>
          ) : (
            <FormHelperText>*Without dash or any symbol</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Controller
            name="publicKey"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                InputLabelProps={{ shrink: true }}
                id="publicKey"
                label="Public key"
                variant="outlined"
                {...field}
              />
            )}
          />
          {errors.publicKey ? (
            <FormHelperText error>{errors.publicKey.message}</FormHelperText>
          ) : (
            <FormHelperText>
              Resident public key. Eg:
              0xd4C94252d9a182FBEd2b0576F07778470F2h2835
            </FormHelperText>
          )}
        </FormControl>
      </form>
      <Box sx={styles.formButtons}>
        <Button
          type="submit"
          form="official_residency_status"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => setToRevoke(false)}
        >
          award
        </Button>
        <Box sx={{ height: 9 }} />
        <Button
          type="submit"
          form="official_residency_status"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => setToRevoke(true)}
        >
          revoke
        </Button>
        <Box sx={{ height: 12 }} />
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleReset}
        >
          reset
        </Button>
      </Box>
    </Box>
  );
}
