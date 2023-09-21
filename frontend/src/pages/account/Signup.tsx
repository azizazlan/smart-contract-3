/* eslint-disable no-console */
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styles from './styles.ts';
import { Link } from 'react-router-dom';
import {
  useResidentAccDispatch,
  useResidentAccSelector,
} from '../../services/hook.ts';
import signupResident from '../../services/residentAccount/thunks/signup.ts';
import { ResidentAccState } from '../../services/store.ts';

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

export default function Signup() {
  const dispatch = useResidentAccDispatch();
  const { submissionState, publicKey, seedPhrase } = useResidentAccSelector(
    (state: ResidentAccState) => state.residentAcc
  );
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
    dispatch(signupResident({ nric }));
  };

  if (submissionState === 'OK' && publicKey && seedPhrase) {
    return (
      <Box sx={{ ...styles.container, marginLeft: 7, marginRight: 7 }}>
        <Alert icon={false} severity="success">
          Signup success! Important to keep your unique seed phrases below.
        </Alert>
        <Card sx={{ minWidth: 175 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 15, color: 'black' }}
              color="text.secondary"
              gutterBottom
            >
              {seedPhrase}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="outlined" component={Link} to="/account">
              OK, view my account
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={submissionState === 'PENDING'}
        onClick={() => console.log('Close backdrop')}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          form="resident_signup_form"
        >
          signup
        </Button>
      </Box>
    </Box>
  );
}
