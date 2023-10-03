import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAdminDispatch, useAdminSelector } from '../../services/hook';
import approveAllowance from '../../services/admin/thunks/approveAllowance';
import { AdminState } from '../../services/store';
import bag_rice from '../../assets/bag-rice.png';
import bag_wheatflour from '../../assets/bag-wheatflour.png';

const schema = Yup.object().shape({
  tokenId: Yup.number()
    .typeError('Token ID must be a number')
    .required('Token ID is required'),
  allowances: Yup.number()
    .typeError('allowancesmust be a number')
    .required('allowances is required')
    .positive('allowances must be a positive number'),
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
  const dispatch = useAdminDispatch();
  const { privateKey } = useAdminSelector((state: AdminState) => state.admin);
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
    const { tokenId, allowances, publicKey } = data;
    console.log('submit allowance!');
    if (!privateKey) {
      console.log('privateKey is null');
      return;
    }
    dispatch(
      approveAllowance({
        tokenId,
        allowances,
        officerPublicKey: publicKey,
        privateKey,
      })
    );
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div>
      <form id="award_token_allowance_form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="allowance-label">Select subsidy token</InputLabel>
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
                <MenuItem value={0} selected>
                  <img
                    src={bag_rice}
                    style={{ width: '16px', marginRight: 7 }}
                  />
                  70kg bag of rice = 1 token
                </MenuItem>
                <MenuItem value={1}>
                  <img
                    src={bag_wheatflour}
                    style={{ width: '16px', marginRight: 7 }}
                  />
                  1kg bag of wheat flour = 1 token
                </MenuItem>
              </Select>
            )}
          />
          {errors.tokenId ? (
            <FormHelperText error>{errors.tokenId?.message}</FormHelperText>
          ) : (
            <FormHelperText>
              Each token represent 70kg bag of rice or 1kg bag of wheat flour
            </FormHelperText>
          )}
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
              Eg: 0xd4C94252d9a182FBEd2b0576F07778470F2h2835
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
          form="award_token_allowance_form"
          variant="contained"
          color="primary"
        >
          approve
        </Button>
      </Box>
    </div>
  );
}
