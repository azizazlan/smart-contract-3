import {
  Box,
  Button,
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
import approveAllowance from '../../services/admin/thunks/approveAllowance';
import styles from './styles';

const schema = Yup.object().shape({
  allowances: Yup.number() // Specify that it should be a number
    .required('Please set the total allowance tokens')
    .integer('Allowance must be an integer') // Optionally, you can enforce it to be an integer
    .min(0, 'Allowance must be greater than or equal to 0'), // Optionally, set a minimum value
});

type AllowanceFields = {
  allowances: number;
};

export default function ApproveAllowanceForm() {
  const dispatch = useAdminDispatch();
  const { privateKey, claimantPublicKey } = useAdminSelector(
    (state: AdminState) => state.admin
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AllowanceFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      allowances: 1000,
    },
  });

  const onSubmit: SubmitHandler<AllowanceFields> = (data) => {
    const { allowances } = data;
    if (!privateKey || !claimantPublicKey) {
      console.log(`privateKey or claimantPublicKey is null`);
      return;
    }
    dispatch(
      approveAllowance({
        officerPublicKey: claimantPublicKey,
        allowances,
        privateKey,
      })
    );
  };

  return (
    <Box sx={{ ...styles.container, marginTop: 3 }}>
      <form id="approve_allowance_form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="dense">
          <InputLabel id="allowance-label">
            Number of allowance tokens
          </InputLabel>
          <Controller
            name="allowances"
            control={control}
            render={({ field }) => (
              <Select
                fullWidth
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
          {errors.allowances ? (
            <FormHelperText error>{errors.allowances?.message}</FormHelperText>
          ) : (
            <FormHelperText>
              Number of allowance token to approve
            </FormHelperText>
          )}
        </FormControl>
      </form>
      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 3 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          type="submit"
          form="approve_allowance_form"
          variant="contained"
          color="primary"
        >
          approve
        </Button>
      </Box>
    </Box>
  );
}
