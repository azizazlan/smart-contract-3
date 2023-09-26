import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import awardResidency from '../../../services/official/thunks/awardResidency';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import { OfficialState } from '../../../services/store';
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

export default function ResidencyForm() {
  const dispatch = useOfficialDispatch();
  const { seedPhrase } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

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
    if (toRevoke) {
      console.log('to revoke!');
      return;
    }
    if (!seedPhrase) {
      console.log('seedPhrase is null');
      return;
    }
    dispatch(
      awardResidency({ nric, publicKey, officialSeedphrase: seedPhrase })
    );
  };

  const handleReset = () => {
    setToRevoke(false);
    reset();
  };

  return (
    <div>
      <form id="official_residency_status" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <Controller
            name="nric"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                placeholder="790411336798"
                InputLabelProps={{ shrink: true }}
                label="NRIC"
                id="nric"
                {...field}
              />
            )}
          />
          {errors.nric ? (
            <FormHelperText error>{errors.nric.message}</FormHelperText>
          ) : (
            <FormHelperText>
              *New NRIC without dash or any symbol
            </FormHelperText>
          )}
        </FormControl>
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
                label="Public key"
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
                Resident address. Example:
                0xd4C94252d9a182FBEd2b0576F07778470F2h2835
              </FormHelperText>
            )}
          </Box>
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
    </div>
  );
}
