import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { isMobile } from 'react-device-detect';

import styles from './styles';
import InsufficientEthAlert from '../../../commons/InsufficientEthAlert';
import { useOfficialSelector } from '../../../services/hook';
import { OfficialState } from '../../../services/store';

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

type TransferFTFields = {
  nric: string;
  publicKey: string;
};

type TransferFTFormProps = {
  toggleCamera: () => void;
};

// Transfer FT page
export default function TransferFTForm(props: TransferFTFormProps) {
  const { toggleCamera } = props;
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferFTFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      nric: '',
      publicKey: '',
    },
  });

  // const dispatch = useOfficialDispatch();
  const { nEtherBal } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  const onSubmit: SubmitHandler<TransferFTFields> = (data) => {
    const { nric, publicKey } = data;
    console.log(publicKey);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Box sx={{ ...styles.container, margin: 3 }}>
      {nEtherBal === 0 ? <InsufficientEthAlert /> : null}
      <Typography variant="h5" color="primary">
        Transfer rice token
      </Typography>
      <form id="official_transfer_ft" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <Controller
            name="nric"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                placeholder="845678910112"
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
              * 12 digits without hyphens or any symbol.
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
      <Box sx={isMobile ? styles.mobileFormButtons : styles.formButtons}>
        <Button
          endIcon={<CameraIcon />}
          fullWidth={isMobile ? true : false}
          variant="outlined"
          onClick={toggleCamera}
        >
          scan
        </Button>
        <Box sx={{ flexGrow: 1 }} />
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
