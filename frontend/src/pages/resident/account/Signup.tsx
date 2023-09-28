/* eslint-disable no-console */
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
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
import { isMobile } from 'react-device-detect';
import {
  useResidentDispatch,
  useResidentSelector,
} from '../../../services/hook.ts';
import signupResident from '../../../services/resident/thunks/signup.ts';
import { ResidentState } from '../../../services/store.ts';
import BackdropLoader from '../../../commons/BackdropLoader.tsx';

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
  const dispatch = useResidentDispatch();
  const { submissionState, publicKey, seedPhrase } = useResidentSelector(
    (state: ResidentState) => state.resident
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
      <BackdropLoader submissionState={submissionState} />
      <form id="resident_signup_form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <Controller
            name="nric"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                placeholder="845678910112"
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
            <FormHelperText>
              * 12 digits without hyphens or any symbol.
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
          to="/"
        >
          cancel
        </Button>
        <Divider sx={{ width: '7px', height: '7px' }} />
        <Button
          fullWidth={isMobile ? true : false}
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
