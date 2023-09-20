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
import styles from './styles.ts';
import { Link } from 'react-router-dom';

const schema = Yup.object().shape({
  nric: Yup.string().required('Please key in your NRIC'),
});

type SignupFields = {
  nric: string;
};

export default function Signup() {
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

  const onSubmit: SubmitHandler<SignupFields> = (data) => {};

  return (
    <Box sx={styles.container}>
      <form id="resident_signup_form" onSubmit={handleSubmit(onSubmit)}>
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
                label="NRIC"
                id="nric"
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
      </form>
      <Box sx={styles.formButtons}>
        <Button variant="outlined" color="secondary" component={Link} to="/">
          cancel
        </Button>
        <Divider sx={{ width: '7px' }} />
        <Button variant="contained" color="primary" type="submit">
          signup
        </Button>
      </Box>
    </Box>
  );
}
