import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import styles from './styles';
import ClaimForm from './ClaimForm';
import FormHeader from '../../../commons/FormHeader';
import TokenIcon from '../../../commons/TokenIcon';
import { TOKEN_NAMES } from '../../../services/subsidyType';
import { Typography } from '@mui/material';

export default function Claim() {
  const { tokenId } = useParams();
  return (
    <Box sx={styles.container}>
      {tokenId ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 1,
          }}
        >
          <FormHeader title="Claim" />
          <TokenIcon tokenId={parseInt(tokenId, 10)} />
          <Typography
            sx={{ fontFamily: 'Oswald', fontSize: '14pt' }}
            color="primary"
          >
            1 token of {TOKEN_NAMES[parseInt(tokenId, 10)]}
          </Typography>
        </Box>
      ) : (
        'Error'
      )}
      <ClaimForm />
    </Box>
  );
}
