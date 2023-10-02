import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  tokenId: Yup.number()
    .typeError('Token ID must be a number')
    .required('Token ID is required')
    .positive('Token ID must be a positive number'),
  allowances: Yup.number()
    .typeError('Token ID must be a number')
    .required('Token ID is required')
    .positive('Token ID must be a positive number'),
  publicKey: Yup.string()
    .required('Please key the resident public key')
    .matches(
      /^(0x)?[0-9a-fA-F]{40}$/u,
      'Invalid Ethereum public key or address'
    ),
});

type AllowancesFormFields = {
  tokenId: number;
  allowances: number;
  publicKey: string;
};

export default function AllowanceForm() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AllowancesFormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      tokenId: 0,
      allowances: 1000,
      publicKey: '',
    },
  });

  const onSubmit: SubmitHandler<AllowancesFormFields> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form id="award_resident_form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="allowance-label">Select subsidy item</InputLabel>
          <Controller
            name="tokenId"
            control={control}
            render={({ field }) => (
              <Select
                fullWidth
                labelId="tokenId-label"
                id="tokenId"
                label="Select subsidy item"
                {...field}
              >
                <MenuItem value={0}>70kg bag of rice</MenuItem>
                <MenuItem value={1}>1kg bag of wheat flour</MenuItem>
              </Select>
            )}
          />
        </FormControl>
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
                <MenuItem value={1000} selected>
                  1,000
                </MenuItem>
                <MenuItem value={10000}>10,000</MenuItem>
                <MenuItem value={100000}>100,000</MenuItem>
              </Select>
            )}
          />
          {errors.allowances ? (
            <FormHelperText error>{errors.allowances?.message}</FormHelperText>
          ) : (
            <FormHelperText>
              Number of allowance MelakaSubsidy rice and wheat flour tokens to
              approve
            </FormHelperText>
          )}
        </FormControl>
      </form>
    </div>
  );
}
