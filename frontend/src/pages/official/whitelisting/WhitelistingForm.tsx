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
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import { OfficialState } from '../../../services/store';
import styles from '../residency/styles';
import addWhitelist from '../../../services/official/thunks/addWhitelist';
import removeWhitelist from '../../../services/official/thunks/removeWhitelist';

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

type WhitelistingFields = {
  nric: string;
  publicKey: string;
};

export default function WhitelistingForm() {
  const [toRemove, setToRemove] = React.useState(false);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WhitelistingFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      nric: '',
      publicKey: '',
    },
  });

  const dispatch = useOfficialDispatch();
  const { seedPhrase } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  const onSubmit: SubmitHandler<WhitelistingFields> = (data) => {
    const { nric, publicKey } = data;
    if (!seedPhrase) {
      console.log('seedPhrase is null');
      return;
    }
    if (toRemove) {
      dispatch(
        removeWhitelist({ nric, publicKey, officialSeedphrase: seedPhrase })
      );
      return;
    }
    dispatch(addWhitelist({ nric, publicKey, officialSeedphrase: seedPhrase }));
  };

  const handleReset = () => {
    setToRemove(false);
    reset();
  };

  return (
    <div>
      <form id="official_whitelisting" onSubmit={handleSubmit(onSubmit)}>
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
          color="primary"
          type="submit"
          form="official_whitelisting"
          fullWidth
          variant="contained"
          onClick={() => setToRemove(false)}
        >
          add
        </Button>
        <Box sx={{ height: 9 }} />
        <Button
          color="secondary"
          type="submit"
          form="official_whitelisting"
          fullWidth
          variant="contained"
          onClick={() => setToRemove(true)}
        >
          remove
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
