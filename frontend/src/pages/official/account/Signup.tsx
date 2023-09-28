/* eslint-disable no-console */
import { useOfficialSelector } from '../../../services/hook.ts';
import { OfficialState } from '../../../services/store.ts';
import BackdropLoader from '../../../commons/BackdropLoader.tsx';
import SignupForm from './SignupForm.tsx';
import styles from './styles.ts';
import {
  Box,
  Alert,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function Signup() {
  const { publicKey, submissionState, seedPhrase } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

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
            <Button variant="outlined" component={Link} to="/signedofficial">
              OK, view my account
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }

  return (
    <div>
      <BackdropLoader submissionState={submissionState} />
      <SignupForm />
    </div>
  );
}
