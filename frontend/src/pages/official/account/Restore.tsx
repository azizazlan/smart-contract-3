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
  seedPhrase: Yup.string().required('Please key in your 12 seed phrases'),
  nric: Yup.string().required('Please key in your NRIC'),
});

type RestoreFields = {
  nric: string;
  seedPhrase: string;
};

export default function Restore() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RestoreFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      nric: '',
      seedPhrase: '',
    },
  });

  const onSubmit: SubmitHandler<RestoreFields> = (data) => {
    console.log(data);
  };

  return (
    <Box sx={styles.container}>
      <form id="official_restore_form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <Controller
            name="nric"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
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
        <FormControl fullWidth margin="normal" variant="outlined">
          <Controller
            name="seedPhrase"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                multiline
                rows={3}
                placeholder="belief god supreme loyalty king country justice citizenship integrity nation wellbeing decency"
                InputLabelProps={{ shrink: true }}
                label="Your existing unique 12 seed phrase"
                id="seedPhrase"
                {...field}
              />
            )}
          />
          {errors.seedPhrase ? (
            <FormHelperText error>{errors.seedPhrase.message}</FormHelperText>
          ) : (
            <FormHelperText>*Without dash or any symbol</FormHelperText>
          )}
        </FormControl>
      </form>
      <Box sx={styles.formButtons}>
        <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to="/official"
        >
          cancel
        </Button>
        <Divider sx={{ width: '7px' }} />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          form="official_restore_form"
        >
          restore
        </Button>
      </Box>
    </Box>
  );
}
