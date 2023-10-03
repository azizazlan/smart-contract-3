import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { isMobile } from 'react-device-detect';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import { OfficialState } from '../../../services/store';
import styles from './styles';
import awardResidentId from '../../../services/official/thunks/awardResidentId';

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

type ResidentAwardFields = {
  nric: string;
  publicKey: string;
};

type ResidencyFormProps = {
  toggleCamera: () => void;
};

export default function ResidencyForm(props: ResidencyFormProps) {
  const { toggleCamera } = props;
  const dispatch = useOfficialDispatch();
  const { seedPhrase, claimantNric, claimantPublicKey } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResidentAwardFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      nric: claimantNric,
      publicKey: claimantPublicKey,
    },
  });

  const onSubmit: SubmitHandler<ResidentAwardFields> = (data) => {
    const { nric, publicKey } = data;
    if (!seedPhrase) {
      console.log('seedPhrase is null');
      return;
    }
    dispatch(
      awardResidentId({
        nric: parseInt(nric, 10),
        publicKey,
        officialSeedphrase: seedPhrase,
      })
    );
  };

  const handleReset = () => {
    reset({ nric: '', publicKey: '' });
  };

  return (
    <div>
      <form id="official_award_residentid" onSubmit={handleSubmit(onSubmit)}>
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
          <Box sx={{ minHeight: 46 }}>
            {errors.publicKey ? (
              <FormHelperText error>{errors.publicKey.message}</FormHelperText>
            ) : (
              <FormHelperText>
                Resident address. Example:
                0xd4C94252d9a182FBEd2b0576F07778470F2h2835
              </FormHelperText>
            )}
          </Box>
        </FormControl>
      </form>
      <Box sx={isMobile ? styles.mobileFormButtons : styles.formButtons}>
        <Button
          endIcon={<CameraIcon />}
          fullWidth={isMobile ? true : false}
          variant="outlined"
          onClick={toggleCamera}
        >
          scan
        </Button>
        <Box sx={{ flexGrow: 1, height: 12, width: 12 }} />
        <Button
          fullWidth={isMobile ? true : false}
          variant="outlined"
          color="secondary"
          onClick={handleReset}
        >
          reset
        </Button>
        <Box sx={{ flexGrow: 0, height: 12, width: 12 }} />
        <Button
          type="submit"
          form="official_award_residentid"
          fullWidth={isMobile ? true : false}
          variant="contained"
          color="primary"
        >
          award
        </Button>
      </Box>
    </div>
  );
}
