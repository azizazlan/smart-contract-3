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
import restore from '../../../services/official/thunks/restore.ts';

const schema = Yup.object().shape({
  seedPhrase: Yup.string().required('Please key in your 12 seed phrases'),
  nric: Yup.string().required('Please key in your NRIC'),
});

type RestoreFields = {
  nric: string;
  seedPhrase: string;
};

export default function RestoreForm() {
  const dispatch = useOfficialDispatch();

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
    const { nric, seedPhrase } = data;
    dispatch(restore({ nric: parseInt(nric, 10), seedPhrase }));
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
              ** 12 digits without hyphens or any symbol.
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
          form="official_restore_form"
        >
          restore
        </Button>
      </Box>
    </Box>
  );
}
