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
import { useAdminDispatch, useAdminSelector } from '../../services/hook';
import awardResidentId from '../../services/admin/thunks/awardResidentId';
import { AdminState } from '../../services/store';
import { resetSubmission } from '../../services/admin/reducer';

const schema = Yup.object().shape({
  nric: Yup.string()
    .required('Please key in the resident NRIC')
    .matches(/^\d{12,14}$/, 'NRIC must be between 12 and 14 digits'),
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

export default function ResidentIdForm() {
  const dispatch = useAdminDispatch();
  const { privateKey } = useAdminSelector((state: AdminState) => state.admin);
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

  const handleReset = () => {
    reset();
    dispatch(resetSubmission());
  };

  const onSubmit: SubmitHandler<ResidentAwardFields> = (data) => {
    const { nric, publicKey } = data;
    if (!privateKey || !publicKey || !nric) {
      console.log('One of the param is null');
      return;
    }
    dispatch(
      awardResidentId({ nric: parseInt(nric, 10), publicKey, privateKey })
    );
  };

  return (
    <div>
      <form id="award_resident_form" onSubmit={handleSubmit(onSubmit)}>
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
          form="award_resident_form"
          variant="contained"
          aria-label="award"
          sx={{ backgroundColor: '#1B1464' }}
        >
          award
        </Button>
      </Box>
    </div>
  );
}
