import React from 'react';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import styles from './styles';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import { OfficialState } from '../../../services/store';
import checkStatus from '../../../services/official/thunks/checkStatus';
import { SubmissionStates } from '../../../services/submissionState';
import { resetVerifySubmission } from '../../../services/official/reducer';
import BackdropLoader from '../../../commons/BackdropLoader';

function Label(props: { label: string }) {
  return (
    <Typography
      component="span"
      color="primary"
      variant="body2"
      sx={{ fontFamily: 'Oswald' }}
    >
      {props.label}
    </Typography>
  );
}

function Value(props: { value: string; submissionState: SubmissionStates }) {
  return (
    <Typography component="span" variant="body2">
      {props.submissionState === 'IDLE' ? '-' : `${props.value}`}
    </Typography>
  );
}

const schema = Yup.object().shape({
  nric: Yup.string()
    .required('Please key in your NRIC')
    .test('valid-nric', 'NRIC must be at least 12 digits numbers', (value) => {
      if (!value) return false; // Skip validation if the value is empty or undefined
      return /^[0-9]{12,}$/.test(value);
    }),
  publicKey: Yup.string()
    .required('Please key the resident public key')
    .matches(
      /^(0x)?[0-9a-fA-F]{40}$/u,
      'Invalid Ethereum public key or address'
    ),
});

type VerifyResidencyFields = {
  nric: string;
  publicKey: string;
};

export default function VerifyResidency() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyResidencyFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      nric: '',
      publicKey: '',
    },
  });

  const dispatch = useOfficialDispatch();
  const { submissionState, isClaimResident, isClaimWhitelisted } =
    useOfficialSelector((state: OfficialState) => state.official);

  const onSubmit: SubmitHandler<VerifyResidencyFields> = (data) => {
    const { nric, publicKey } = data;
    console.log(`${nric} ${publicKey}`);
    dispatch(
      checkStatus({
        checkOfficer: false,
        nric,
        publicKey,
      })
    );
  };

  const handleReset = () => {
    reset();
    dispatch(resetVerifySubmission());
  };

  return (
    <Box sx={{ ...styles.container, margin: 3 }}>
      <BackdropLoader submissionState={submissionState} />
      <Typography variant="h5" color="primary">
        Residency and whitelisting status
      </Typography>
      <form id="official_verify_residency" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <Controller
            name="nric"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                placeholder="790411336798"
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
              *New NRIC without dash or any symbol
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
                placeholder="0xd4C94252d9a182FBEd2b0576F07778470F2h2835"
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
              Example: 0xd4C94252d9a182FBEd2b0576F07778470F2h2835
            </FormHelperText>
          )}
        </FormControl>
      </form>
      <Card
        sx={{
          height: '115px',
          backgroundColor: '#f5f6fa',
          paddingLeft: 2,
          paddingTop: 1,
          paddingRight: 2,
        }}
      >
        <List sx={{ width: '100%' }} disablePadding>
          <ListItem disablePadding>
            <ListItemText
              primary={<Label label="Residency status" />}
              secondary={
                <Value
                  submissionState={submissionState}
                  value={`${
                    isClaimResident ? 'Is a resident ✅' : 'Non-resident ❌'
                  }`}
                />
              }
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primary={<Label label="Whitelisting status" />}
              secondary={
                <Value
                  submissionState={submissionState}
                  value={`${
                    isClaimWhitelisted
                      ? 'Whitelisted ✅'
                      : 'Not in whitelisted ❌'
                  }`}
                />
              }
            />
          </ListItem>
        </List>
      </Card>
      <Box sx={styles.formButtons}>
        <Button
          type="submit"
          form="official_verify_residency"
          fullWidth
          variant="contained"
          color="primary"
        >
          verify
        </Button>
        <Box sx={{ height: 7 }} />
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleReset}
        >
          reset
        </Button>
      </Box>
    </Box>
  );
}
