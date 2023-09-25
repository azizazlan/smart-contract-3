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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAdminDispatch, useAdminSelector } from '../../services/hook';
import checkRole from '../../services/admin/thunks/checkRole';
import { AdminState } from '../../services/store';
import { resetSubmission } from '../../services/admin/reducer';
import BackdropLoader from '../../commons/BackdropLoader';
import assignRole from '../../services/admin/thunks/assignRole';

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

export default function OfficerTab() {
  const [checkRoleForm, setCheckRoleForm] = React.useState(false);
  const dispatch = useAdminDispatch();
  const { submissionState, isClaimantOfficer, claimantPublicKey } =
    useAdminSelector((state: AdminState) => state.admin);

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
    if (checkRoleForm) {
      dispatch(checkRole({ publicKey }));
      return;
    }
    dispatch(assignRole({ publicKey }));
  };

  const handleReset = () => {
    reset();
    dispatch(resetSubmission());
    setCheckRoleForm(false);
  };

  const handleCloseAlert = () => {
    dispatch(resetSubmission());
    setCheckRoleForm(false);
  };

  return (
    <Box sx={{ marginTop: 0 }}>
      <BackdropLoader submissionState={submissionState} />
      <form id="assign_role_form" onSubmit={handleSubmit(onSubmit)}>
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
        {submissionState === 'OK' && checkRoleForm && !errors.publicKey ? (
          <Alert
            sx={{ mb: 2 }}
            icon={false}
            severity="success"
            action={
              <IconButton size="small" onClick={handleCloseAlert}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {isClaimantOfficer
              ? `Public key is an officer!`
              : `No role was assigned to the public key.`}
          </Alert>
        ) : null}

        {submissionState === 'OK' && !checkRoleForm && claimantPublicKey ? (
          <Alert
            sx={{ mb: 2 }}
            icon={false}
            severity="success"
            action={
              <IconButton size="small" onClick={handleCloseAlert}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Successfully assigned as an officer!
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
          type="submit"
          form="assign_role_form"
          variant="outlined"
          color="primary"
          onClick={() => setCheckRoleForm(true)}
        >
          check role
        </Button>
        <Divider sx={{ minWidth: 7 }} />
        <Button
          type="submit"
          form="assign_role_form"
          variant="contained"
          color="primary"
          onClick={() => setCheckRoleForm(false)}
        >
          assign
        </Button>
      </Box>
    </Box>
  );
}
