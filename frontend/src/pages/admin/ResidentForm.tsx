import React from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Divider,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAdminDispatch, useAdminSelector } from '../../services/hook';
import awardResident from '../../services/admin/thunks/awardResident';
import { AdminState } from '../../services/store';
import { resetSubmission } from '../../services/admin/reducer';
import revokeResidency from '../../services/admin/thunks/revokeResidency';

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

type ResidentAwardFields = {
  nric: string;
  publicKey: string;
};

export default function ResidentForm() {
  const [toRevoke, setToRevoke] = React.useState(false);
  const dispatch = useAdminDispatch();
  const { submissionState, privateKey, isClaimantResident } = useAdminSelector(
    (state: AdminState) => state.admin
  );
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
    if (toRevoke) {
      dispatch(revokeResidency({ publicKey, privateKey, nric }));
      return;
    }
    dispatch(awardResident({ publicKey, privateKey, nric }));
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
          color="secondary"
          onClick={() => setToRevoke(true)}
          type="submit"
          form="award_resident_form"
          variant="contained"
          aria-label="status"
        >
          revoke
        </Button>
        <Divider sx={{ minWidth: 7 }} />
        <Button
          onClick={() => setToRevoke(false)}
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
