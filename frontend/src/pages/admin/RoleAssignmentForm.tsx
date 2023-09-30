import React from 'react';
import {
  Box,
  TextField,
  Button,
  Divider,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAdminDispatch, useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import { resetSubmission } from '../../services/admin/reducer';
import assignRole from '../../services/admin/thunks/assignRole';
import revokeRole from '../../services/admin/thunks/revokeRole';

const schema = Yup.object().shape({
  publicKey: Yup.string()
    .required('Please key the resident public key')
    .matches(
      /^(0x)?[0-9a-fA-F]{40}$/u,
      'Invalid Ethereum public key or address'
    ),
});

type AssignRoleFields = {
  publicKey: string;
};

export default function RoleAssignmentForm() {
  const [checkRevoke, setCheckRevoke] = React.useState(false);
  const dispatch = useAdminDispatch();
  const { privateKey } = useAdminSelector((state: AdminState) => state.admin);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignRoleFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      publicKey: '',
    },
  });

  const onSubmit: SubmitHandler<AssignRoleFields> = (data) => {
    const { publicKey } = data;
    if (!privateKey) {
      console.log('Could not dispatch because privateKey is null');
      return;
    }
    if (checkRevoke) {
      dispatch(revokeRole({ publicKey, privateKey }));
      return;
    }
    dispatch(assignRole({ publicKey, privateKey }));
  };

  const handleReset = () => {
    reset();
    dispatch(resetSubmission());
    setCheckRevoke(false);
  };

  return (
    <div>
      <form id="assign_revoke_role_form" onSubmit={handleSubmit(onSubmit)}>
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
          form="assign_revoke_role_form"
          variant="contained"
          color="secondary"
          onClick={() => setCheckRevoke(true)}
        >
          revoke
        </Button>
        <Divider sx={{ minWidth: 7 }} />
        <Button
          type="submit"
          form="assign_revoke_role_form"
          variant="contained"
          color="primary"
          onClick={() => setCheckRevoke(false)}
        >
          approve & assign
        </Button>
      </Box>
    </div>
  );
}
