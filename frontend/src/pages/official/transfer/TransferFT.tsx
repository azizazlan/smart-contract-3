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
import awardResidency from '../../../services/official/thunks/awardResidency';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import { OfficialState } from '../../../services/store';

const schema = Yup.object().shape({
  publicKey: Yup.string()
    .required('Please key the resident public key')
    .matches(
      /^(0x)?[0-9a-fA-F]{40}$/u,
      'Invalid Ethereum public key or address'
    ),
});

type TransferFTFields = {
  publicKey: string;
};

// Transfer FT page
export default function TransferFT() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferFTFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      publicKey: '',
    },
  });

  const dispatch = useOfficialDispatch();
  const { seedPhrase } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  const onSubmit: SubmitHandler<TransferFTFields> = (data) => {
    const { publicKey } = data;
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Box sx={{ ...styles.container, margin: 3 }}>
      <Typography variant="h5" color="primary">
        Transfer rice token
      </Typography>
      <form id="official_transfer_ft" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="publicKey"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                placeholder="0xd4C94252d9a182FBEd2b0576F07778470F2h2835"
                InputLabelProps={{ shrink: true }}
                id="publicKey"
                label="Resident public key"
                variant="outlined"
                {...field}
              />
            )}
          />
          <Box sx={{ minHeight: 46 }}>
            {errors.publicKey ? (
              <FormHelperText error>{errors.publicKey.message}</FormHelperText>
            ) : (
              <FormHelperText>
                Recipient address. Example:
                0xd4C94252d9a182FBEd2b0576F07778470F2h2835
              </FormHelperText>
            )}
          </Box>
        </FormControl>
      </form>
      <Box sx={styles.formButtons}>
        <Button
          type="submit"
          form="official_transfer_ft"
          fullWidth
          variant="contained"
        >
          transfer
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
