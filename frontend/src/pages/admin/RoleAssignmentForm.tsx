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
import styles from './styles';

const schema = Yup.object().shape({
  officerPublicKey: Yup.string()
    .required('Please key the officer public key')
    .matches(
      /^(0x)?[0-9a-fA-F]{40}$/u,
      'Invalid Ethereum public key or address'
    ),
});

type AssignRoleFields = {
  officerPublicKey: string;
};

export default function RoleAssignmentForm() {
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
      officerPublicKey: '',
    },
  });

  const onSubmit: SubmitHandler<AssignRoleFields> = (data) => {
    const { officerPublicKey } = data;
    if (!privateKey) {
      console.log('Could not dispatch because privateKey is null');
      return;
    }
    dispatch(assignRole({ officerPublicKey, privateKey }));
  };

  const handleReset = () => {
    reset();
    dispatch(resetSubmission());
  };

  return (
    <Box sx={{ ...styles.container, marginTop: 3 }}>
      <form id="assign_revoke_role_form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="officerPublicKey"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                InputLabelProps={{ shrink: true }}
                id="officerPublicKey"
                label="Public key"
                variant="outlined"
                {...field}
              />
            )}
          />
          {errors.officerPublicKey ? (
            <FormHelperText error>
              {errors.officerPublicKey.message}
            </FormHelperText>
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
          color="primary"
        >
          assign
        </Button>
      </Box>
    </Box>
  );
}
