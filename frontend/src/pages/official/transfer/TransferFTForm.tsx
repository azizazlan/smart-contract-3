import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { isMobile } from 'react-device-detect';

import styles from './styles';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import { OfficialState } from '../../../services/store';
import initialize from '../../../services/official/thunks/initialize';
import bag_rice from '../../../assets/bag-rice.png';
import bag_wheatflour from '../../../assets/bag-wheatflour.png';
import bag_cookingoil from '../../../assets/bag-cooking-oil.png';
import transferTokens from '../../../services/official/thunks/transferTokens';

const schema = Yup.object().shape({
  tokenId: Yup.number()
    .typeError('Token ID must be a number')
    .required('Token ID is required'),
  recipientNric: Yup.string()
    .required('Please key in your NRIC')
    .test('valid-nric', 'NRIC must be at least 12 digits numbers', (value) => {
      if (!value) return false; // Skip validation if the value is empty or undefined
      return /^[0-9]{12,}$/.test(value);
    }),
  recipientPublicKey: Yup.string()
    .required('Please key the resident public key')
    .matches(
      /^(0x)?[0-9a-fA-F]{40}$/u,
      'Invalid Ethereum public key or address'
    ),
});

type TransferFTFields = {
  tokenId: number;
  recipientNric: string;
  recipientPublicKey: string;
};

type TransferFTFormProps = {
  toggleCamera: () => void;
};

// Transfer FT page
export default function TransferFTForm(props: TransferFTFormProps) {
  const dispatch = useOfficialDispatch();
  const { claimantNric, claimantPublicKey, seedPhrase } = useOfficialSelector(
    (state: OfficialState) => state.official
  );
  const { toggleCamera } = props;
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferFTFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      tokenId: 0,
      recipientNric: claimantNric,
      recipientPublicKey: claimantPublicKey,
    },
  });

  React.useEffect(() => {
    dispatch(initialize());
  }, []);

  const onSubmit: SubmitHandler<TransferFTFields> = (data) => {
    const { tokenId, recipientNric, recipientPublicKey } = data;
    if (!seedPhrase) {
      console.log(`seedPhrase is null!`);
      return;
    }
    dispatch(
      transferTokens({
        tokenId,
        residentNric: recipientNric,
        residentPublicKey: recipientPublicKey,
        officialSeedphrase: seedPhrase,
      })
    );
  };

  const handleReset = () => {
    reset({ recipientNric: '', recipientPublicKey: '' });
  };

  return (
    <Box sx={{ ...styles.container, margin: 3 }}>
      <Typography variant="h5" color="primary">
        Transfer subsidy token
      </Typography>
      <form id="official_transfer_ft" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="allowance-label">Select subsidy token</InputLabel>
          <Controller
            name="tokenId"
            control={control}
            render={({ field }) => (
              <Select
                fullWidth
                labelId="tokenId-label"
                id="tokenId"
                label="Select subsidy item"
                {...field}
              >
                <MenuItem value={0} selected>
                  <img
                    src={bag_rice}
                    style={{ width: '16px', marginRight: 7 }}
                  />
                  70kg bag of rice ≡ 1 token
                </MenuItem>
                <MenuItem value={1}>
                  <img
                    src={bag_wheatflour}
                    style={{ width: '16px', marginRight: 7 }}
                  />
                  1kg bag of wheat flour ≡ 1 token
                </MenuItem>
                <MenuItem value={2}>
                  <img
                    src={bag_cookingoil}
                    style={{ width: '16px', marginRight: 7 }}
                  />
                  1kg bag of cooking oil ≡ 1 token
                </MenuItem>
              </Select>
            )}
          />
          {errors.tokenId ? (
            <FormHelperText error>{errors.tokenId?.message}</FormHelperText>
          ) : (
            <FormHelperText>
              Each token is equivalent to 70kg bag of rice or 1kg bag of wheat
              flour
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <Controller
            name="recipientNric"
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                placeholder="845678910112"
                InputLabelProps={{ shrink: true }}
                label="NRIC"
                id="recipientNric"
                {...field}
              />
            )}
          />
          {errors.recipientNric ? (
            <FormHelperText error>
              {errors.recipientNric.message}
            </FormHelperText>
          ) : (
            <FormHelperText>
              * 12 digits without hyphens or any symbol.
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Controller
            name="recipientPublicKey"
            control={control}
            render={({ field }) => (
              <TextField
                placeholder="0xd4C94252d9a182FBEd2b0576F07778470F2h2835"
                InputLabelProps={{ shrink: true }}
                id="recipientPublicKey"
                label="Resident public key"
                variant="outlined"
                {...field}
              />
            )}
          />
          {errors.recipientPublicKey ? (
            <FormHelperText error>
              {errors.recipientPublicKey.message}
            </FormHelperText>
          ) : (
            <FormHelperText>Recipient address public key.</FormHelperText>
          )}
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
        <Box sx={{ height: 12, width: 12 }} />
        <Button
          type="submit"
          form="official_transfer_ft"
          fullWidth={isMobile ? true : false}
          variant="contained"
        >
          transfer
        </Button>
      </Box>
    </Box>
  );
}
