import React from 'react';
import {
  Box,
  TextField,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Alert,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAdminDispatch, useAdminSelector } from '../../services/hook';
import awardResident from '../../services/admin/thunks/awardResident';
import { AdminState } from '../../services/store';
import { resetSubmission } from '../../services/admin/reducer';
import checkResidency from '../../services/admin/thunks/checkResidency';
import BackdropLoader from '../../commons/BackdropLoader';

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

export default function ResidentTab() {
  const [checkResidencyForm, setCheckResidencyForm] = React.useState(false);
  const dispatch = useAdminDispatch();
  const { submissionState, isResident } = useAdminSelector(
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

  const handleResetSubmission = () => {
    dispatch(resetSubmission());
  };

  const onSubmit: SubmitHandler<ResidentAwardFields> = (data) => {
    const { nric, publicKey } = data;
    if (checkResidencyForm) {
      dispatch(checkResidency({ publicKey, nric }));
      return;
    }
    dispatch(awardResident({ publicKey, nric }));
  };

  return (
    <Box sx={{ marginTop: 0 }}>
      <BackdropLoader submissionState={submissionState} />
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
      <Box sx={{ minHeight: '57pt', marginTop: 1 }}>
        {submissionState === 'FAILED' ? (
          <Alert
            sx={{ mb: 2 }}
            icon={false}
            severity="error"
            action={
              <IconButton size="small" onClick={handleResetSubmission}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Failed to award! The NRIC or public key already has been added or
            mismatch with the public key!
          </Alert>
        ) : null}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 3 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          reset
        </Button>
        <Divider sx={{ minWidth: 7 }} />
        <Button variant="contained" color="secondary">
          revoke
        </Button>
        <Divider sx={{ minWidth: 7 }} />
        <Button
          onClick={() => setCheckResidencyForm(true)}
          type="submit"
          form="award_resident_form"
          variant="outlined"
          aria-label="status"
          endIcon={isResident ? <DoneIcon /> : null}
        >
          residency
        </Button>
        <Divider sx={{ minWidth: 7 }} />
        <Button
          onClick={() => setCheckResidencyForm(false)}
          type="submit"
          form="award_resident_form"
          variant="contained"
          aria-label="award"
          sx={{ backgroundColor: '#1B1464' }}
        >
          award
        </Button>
      </Box>
    </Box>
  );
}
