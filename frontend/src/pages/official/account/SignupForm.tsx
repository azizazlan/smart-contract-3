/* eslint-disable no-console */
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { isMobile } from 'react-device-detect';
import styles from './styles.ts';
import { Link } from 'react-router-dom';
import { useOfficialDispatch } from '../../../services/hook.ts';
import signupOfficial from '../../../services/official/thunks/signup.ts';

const schema = Yup.object().shape({
  nric: Yup.string()
    .required('Please key in your NRIC')
    .test('valid-nric', 'NRIC must be at least 12 digits numbers', (value) => {
      if (!value) return false; // Skip validation if the value is empty or undefined
      return /^[0-9]{12,}$/.test(value);
    }),
});

type SignupFields = {
  nric: string;
};

export default function SignupForm() {
  const dispatch = useOfficialDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      nric: '',
    },
  });

  const onSubmit: SubmitHandler<SignupFields> = (data) => {
    const { nric } = data;
    dispatch(signupOfficial({ nric }));
  };

  return (
    <Box sx={{ ...styles.container }}>
      <form id="official_signup_form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <Controller
            name="nric"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                placeholder="34567891011"
                InputLabelProps={{ shrink: true }}
                label="Official NRIC"
                id="nric"
                {...field}
              />
            )}
          />
          {errors.nric ? (
            <FormHelperText error>{errors.nric.message}</FormHelperText>
          ) : (
            <FormHelperText>
              ** 12 digits without hyphens or any symbol.
            </FormHelperText>
          )}
        </FormControl>
      </form>
      <Box sx={isMobile ? styles.mobileFormButtons : styles.formButtons}>
        <Button
          fullWidth={isMobile ? true : false}
          variant="outlined"
          color="secondary"
          component={Link}
          to="/official"
        >
          cancel
        </Button>
        <Divider sx={{ width: '7px', height: '7px' }} />
        <Button
          sx={{ backgroundColor: 'black' }}
          fullWidth={isMobile ? true : false}
          variant="contained"
          color="primary"
          type="submit"
          form="official_signup_form"
        >
          signup
        </Button>
      </Box>
    </Box>
  );
}
