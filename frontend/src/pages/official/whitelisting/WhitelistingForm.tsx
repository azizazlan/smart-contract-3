import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { isMobile } from 'react-device-detect';
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

type WhitelistingFormProps = {
  toggleCamera: () => void;
};

export default function WhitelistingForm(props: WhitelistingFormProps) {
  const { toggleCamera } = props;
  const [toRemove, setToRemove] = React.useState(false);
  const dispatch = useOfficialDispatch();
  const { seedPhrase, claimantNric, claimantPublicKey } = useOfficialSelector(
    (state: OfficialState) => state.official
  );
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WhitelistingFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      nric: claimantNric,
      publicKey: claimantPublicKey,
    },
  });

  const onSubmit: SubmitHandler<WhitelistingFields> = (data) => {
    const { nric, publicKey } = data;
    if (!seedPhrase) {
      console.log('seedPhrase is null');
      return;
    }
    if (toRemove) {
      dispatch(
        removeWhitelist({
          nric: parseInt(nric, 10),
          publicKey,
          officialSeedphrase: seedPhrase,
        })
      );
      return;
    }
    dispatch(
      addWhitelist({
        nric: parseInt(nric, 10),
        publicKey,
        officialSeedphrase: seedPhrase,
      })
    );
  };

  const handleReset = () => {
    setToRemove(false);
    reset({ nric: '', publicKey: '' });
  };

  return (
    <Box sx={{ ...styles.container, margin: 0 }}>
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
              <FormHelperText>Resident public key.</FormHelperText>
            )}
          </Box>
        </FormControl>
      </form>
      <Box sx={isMobile ? styles.mobileFormButtons : styles.formButtons}>
        <Button
          endIcon={<CameraIcon />}
          fullWidth={isMobile ? true : false}
          variant="outlined"
          onClick={toggleCamera}
        >
          scan
        </Button>
        <Box sx={{ flexGrow: 1, height: 12, width: 12 }} />
        <Button
          fullWidth={isMobile ? true : false}
          variant="outlined"
          color="secondary"
          onClick={handleReset}
        >
          reset
        </Button>
        <Box sx={{ flexGrow: 0, height: 12, width: 12 }} />
        <Button
          color="secondary"
          type="submit"
          form="official_whitelisting"
          fullWidth={isMobile ? true : false}
          variant="contained"
          onClick={() => setToRemove(true)}
        >
          remove
        </Button>
        <Box sx={{ flexGrow: 0, height: 12, width: 12 }} />
        <Button
          color="primary"
          type="submit"
          form="official_whitelisting"
          fullWidth={isMobile ? true : false}
          variant="contained"
          onClick={() => setToRemove(false)}
        >
          add
        </Button>
      </Box>
    </Box>
  );
}
