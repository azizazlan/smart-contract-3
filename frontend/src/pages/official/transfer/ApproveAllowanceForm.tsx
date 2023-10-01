import {
  Box,
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
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import { OfficialState } from '../../../services/store';
import styles from './styles';
import approveAllowance from '../../../services/official/thunks/approveAllowance';

const schema = Yup.object().shape({
  // publicKey: Yup.string()
  //   .required('Please key the resident public key')
  //   .matches(
  //     /^(0x)?[0-9a-fA-F]{40}$/u,
  //     'Invalid Ethereum public key or address'
  //   ),
  allowance: Yup.number() // Specify that it should be a number
    .required('Please set the total allowance tokens')
    .integer('Allowance must be an integer') // Optionally, you can enforce it to be an integer
    .min(0, 'Allowance must be greater than or equal to 0'), // Optionally, set a minimum value
});

type AllowanceFields = {
  allowance: number;
};

export default function ApproveAllowanceForm() {
  const dispatch = useOfficialDispatch();
  const { seedPhrase } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

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
    const { allowance } = data;
    console.log('onSubmit allow!');
    if (!seedPhrase) {
      console.log(`seedPhrase is null`);
      return;
    }
    console.log(seedPhrase);
    dispatch(approveAllowance({ seedPhrase, allowance }));
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Box sx={{ ...styles.container, margin: 3 }}>
      <form
        id="approve_official_allowance_form"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          form="approve_official_allowance_form"
          variant="contained"
          color="primary"
        >
          approve
        </Button>
      </Box>
    </Box>
  );
}
