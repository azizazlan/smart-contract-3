import {
  FormControl,
  TextField,
  FormHelperText,
  Box,
  Button,
} from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { isMobile } from 'react-device-detect';
import styles from './styles';
import { useOfficialDispatch } from '../../../services/hook';
import { resetVerifySubmission } from '../../../services/official/reducer';
import verifyResident from '../../../services/official/thunks/verifyResident';

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

type VerifyResidencyFields = {
  nric: string;
  publicKey: string;
};

export default function VerificationForm() {
  const dispatch = useOfficialDispatch();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyResidencyFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      nric: '',
      publicKey: '',
    },
  });

  const onSubmit: SubmitHandler<VerifyResidencyFields> = (data) => {
    const { nric, publicKey } = data;
    console.log(`${nric} ${publicKey}`);
    dispatch(
      verifyResident({
        nric: parseInt(nric, 10),
        publicKey,
      })
    );
  };

  const handleReset = () => {
    reset();
    dispatch(resetVerifySubmission());
  };

  return (
    <Box sx={{ ...styles.container, margin: 0 }}>
      <form id="official_verify_residency" onSubmit={handleSubmit(onSubmit)}>
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
          {errors.publicKey ? (
            <FormHelperText error>{errors.publicKey.message}</FormHelperText>
          ) : (
            <FormHelperText>
              Example: 0xd4C94252d9a182FBEd2b0576F07778470F2h2835
            </FormHelperText>
          )}
        </FormControl>
      </form>
      <Box sx={isMobile ? styles.mobileFormButtons : styles.formButtons}>
        <Button
          endIcon={<CameraIcon />}
          fullWidth={isMobile ? true : false}
          variant="outlined"
          onClick={() => console.log('camera!!!')}
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
          type="submit"
          form="official_verify_residency"
          fullWidth={isMobile ? true : false}
          variant="contained"
          color="primary"
        >
          verify
        </Button>
      </Box>
    </Box>
  );
}
