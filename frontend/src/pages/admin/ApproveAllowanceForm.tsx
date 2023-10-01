import React from 'react';
import {
  Box,
  TextField,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAdminDispatch, useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import { resetSubmission } from '../../services/admin/reducer';
import assignRole from '../../services/admin/thunks/assignRole';
import revokeRole from '../../services/admin/thunks/revokeRole';
import approveAllowance from '../../services/admin/thunks/approveAllowance';

const schema = Yup.object().shape({
  // publicKey: Yup.string()
  //   .required('Please key the resident public key')
  //   .matches(
  //     /^(0x)?[0-9a-fA-F]{40}$/u,
  //     'Invalid Ethereum public key or address'
  //   ),
  seedPhrase: Yup.string().required('Please key in officer seed phrase'),
  allowance: Yup.number() // Specify that it should be a number
    .required('Please set the total allowance tokens')
    .integer('Allowance must be an integer') // Optionally, you can enforce it to be an integer
    .min(0, 'Allowance must be greater than or equal to 0'), // Optionally, set a minimum value
});

type AllowanceFields = {
  seedPhrase: string;
  allowance: number;
};

export default function ApproveAllowanceForm() {
  const dispatch = useAdminDispatch();
  const { privateKey } = useAdminSelector((state: AdminState) => state.admin);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AllowanceFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      allowance: 1000,
    },
  });

  const onSubmit: SubmitHandler<AllowanceFields> = (data) => {
    const { seedPhrase, allowance } = data;
    if (!privateKey) {
      console.log(`privateKey is null`);
      return;
    }
    dispatch(approveAllowance({ seedPhrase, allowance, privateKey }));
  };

  const handleReset = () => {
    reset();
    dispatch(resetSubmission());
  };

  return (
    <div>
      <form id="approve_allowance_form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal" sx={{ flexGrow: 1 }}>
          <Controller
            name="seedPhrase"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                InputLabelProps={{ shrink: true }}
                id="seedPhrase"
                label="Officer seed phrase"
                variant="outlined"
                {...field}
              />
            )}
          />
          {errors.seedPhrase ? (
            <FormHelperText error>{errors.seedPhrase.message}</FormHelperText>
          ) : (
            <FormHelperText>Office seed phrase</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="allowance-label">
            Number of allowance tokens
          </InputLabel>
          <Controller
            name="allowance"
            control={control}
            render={({ field }) => (
              <Select
                labelId="allowance-label"
                id="allowance"
                label="Number of allowance tokens"
                {...field}
              >
                <MenuItem value={1000}>1,000</MenuItem>
                <MenuItem value={10000}>10,000</MenuItem>
                <MenuItem value={100000}>100,000</MenuItem>
              </Select>
            )}
          />
          {errors.allowance ? (
            <FormHelperText error>{errors.allowance?.message}</FormHelperText>
          ) : (
            <FormHelperText>
              Number of allowance token to approve
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
          form="approve_allowance_form"
          variant="contained"
          color="primary"
        >
          approve
        </Button>
      </Box>
    </div>
  );
}
