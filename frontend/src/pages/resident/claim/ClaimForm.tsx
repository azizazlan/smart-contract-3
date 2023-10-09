import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import CameraIcon from '@mui/icons-material/Camera';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormControl, TextField, FormHelperText, Button } from '@mui/material';
import { isMobile } from 'react-device-detect';
import styles from './styles';
import {
  useResidentDispatch,
  useResidentSelector,
} from '../../../services/hook';
import claim from '../../../services/resident/thunks/claim';
import { ResidentState } from '../../../services/store';
import { setError } from '../../../services/resident/reducer';

const schema = Yup.object().shape({
  merchantPublicKey: Yup.string()
    .required('Please key the resident public key')
    .matches(
      /^(0x)?[0-9a-fA-F]{40}$/u,
      'Invalid Ethereum public key or address'
    ),
});

type ClaimFields = {
  merchantPublicKey: string;
};

type ClaimFormProps = {
  toggleCamera: () => void;
};

export default function ClaimForm(props: ClaimFormProps) {
  const { toggleCamera } = props;
  const { tokenId } = useParams();
  const dispatch = useResidentDispatch();
  const { seedPhrase, nric, merchantPublicKey } = useResidentSelector(
    (state: ResidentState) => state.resident
  );
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      merchantPublicKey: merchantPublicKey || '',
    },
  });

  const onSubmit: SubmitHandler<ClaimFields> = (data) => {
    const { merchantPublicKey } = data;
    if (!seedPhrase || !tokenId) {
      dispatch(
        setError({
          message: 'Ethereum account not recognized. Go to HOME and try again',
        })
      );
      return;
    }
    dispatch(
      claim({
        tokenId: parseInt(tokenId, 10),
        merchantPublicKey,
        seedPhrase,
        residentNric: nric,
      })
    );
  };

  const handleReset = () => {
    reset({ merchantPublicKey: '' });
  };

  return (
    <Box>
      <form id="resident_claim" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="merchantPublicKey"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                placeholder="0xd4C94252d9a182FBEd2b0576F07778470F2h2835"
                InputLabelProps={{ shrink: true }}
                id="merchantPublicKey"
                label="Merchant public key"
                variant="outlined"
                {...field}
              />
            )}
          />
          {errors.merchantPublicKey ? (
            <FormHelperText error>
              {errors.merchantPublicKey.message}
            </FormHelperText>
          ) : (
            <FormHelperText>
              Or click scan below to scan merchant's QR code
            </FormHelperText>
          )}
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
        <Box sx={{ flexGrow: 1, minHeight: 12, width: 12 }} />
        <Button
          fullWidth={isMobile ? true : false}
          variant="outlined"
          color="secondary"
          onClick={handleReset}
        >
          reset
        </Button>
        <Box sx={{ height: 12, width: 12 }} />
        <Button
          type="submit"
          fullWidth={isMobile ? true : false}
          form="resident_claim"
          variant="contained"
          color="primary"
        >
          claim
        </Button>
      </Box>
    </Box>
  );
}
