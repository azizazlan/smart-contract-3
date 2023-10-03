import {
  Box,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Divider,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAdminDispatch } from '../../services/hook';
import { resetSubmission } from '../../services/admin/reducer';
import checkStatus from '../../services/admin/thunks/checkStatus';

const schema = Yup.object().shape({
  nric: Yup.string()
    .required('Please key in the resident NRIC')
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

type CheckFormFields = {
  nric: string;
  publicKey: string;
};

export default function CheckForm() {
  const dispatch = useAdminDispatch();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckFormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      nric: '',
      publicKey: '',
    },
  });

  const handleReset = () => {
    reset();
    dispatch(resetSubmission());
  };

  const onSubmit: SubmitHandler<CheckFormFields> = (data) => {
    const { nric, publicKey } = data;
    if (!publicKey || !nric) {
      console.log('One of the param is null');
      return;
    }
    dispatch(checkStatus({ nric, publicKey }));
  };

  return (
    <div>
      <form id="admin_verify_form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal" sx={{ flexGrow: 1 }}>
          <Controller
            name="nric"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                InputLabelProps={{ shrink: true }}
                id="nric"
                label="NRIC"
                variant="outlined"
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
      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 3 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          reset
        </Button>
        <Divider sx={{ minWidth: 7 }} />
        <Button
          type="submit"
          form="admin_verify_form"
          variant="contained"
          aria-label="award"
        >
          check
        </Button>
      </Box>
    </div>
  );
}
