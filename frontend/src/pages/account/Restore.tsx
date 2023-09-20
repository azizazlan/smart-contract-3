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
  mnemonics: Yup.string().required('Please key in your 12 seed phrases'),
});

type RestoreFields = {
  mnemonics: string;
};

export default function Restore() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RestoreFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      mnemonics: '',
    },
  });

  const onSubmit: SubmitHandler<RestoreFields> = (data) => {};

  return (
    <Box sx={styles.container}>
      <form id="resident_restore_form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <Controller
            name="mnemonics"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                multiline
                rows={3}
                placeholder="belief god supreme loyalty king country justice citizenship integrity nation wellbeing decency"
                InputLabelProps={{ shrink: true }}
                label="Your existing unique 12 seed phrase"
                id="mnemonics"
                {...field}
              />
            )}
          />
          {errors.mnemonics ? (
            <FormHelperText error>{errors.mnemonics.message}</FormHelperText>
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
          restore
        </Button>
      </Box>
    </Box>
  );
}
