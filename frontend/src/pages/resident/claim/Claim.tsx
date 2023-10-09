import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import styles from './styles';
import ClaimForm from './ClaimForm';
import FormHeader from '../../../commons/FormHeader';
import TokenIcon from '../../../commons/TokenIcon';
import { TOKEN_NAMES } from '../../../services/subsidyType';
import { Typography } from '@mui/material';
import {
  useResidentDispatch,
  useResidentSelector,
} from '../../../services/hook';
import { ResidentState } from '../../../services/store';
import BackdropLoader from '../../../commons/BackdropLoader';
import Result from './Result';
import { resetClaimSubmission } from '../../../services/resident/reducer';

export default function Claim() {
  const { tokenId } = useParams();
  const dispatch = useResidentDispatch();
  const { submissionState, submissionMsg, tokensBalances } =
    useResidentSelector((state: ResidentState) => state.resident);

  React.useEffect(() => {
    dispatch(resetClaimSubmission());
  }, []);

  if (submissionState === 'OK' && submissionMsg) {
    return <Result />;
  }

  return (
    <Box sx={styles.container}>
      <BackdropLoader submissionState={submissionState} />
      {tokenId ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 1,
          }}
        >
          <FormHeader
            title="Claim one token"
            cancelUrl="/signedresident/txhistory"
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
            <TokenIcon tokenId={parseInt(tokenId, 10)} />
            <Typography
              sx={{ fontFamily: 'Oswald', fontSize: '14pt', marginLeft: 1 }}
              color="primary"
            >
              {TOKEN_NAMES[parseInt(tokenId, 10)]}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: 1 }}>
            <Typography
              sx={{ fontFamily: 'Oswald', color: 'silver', marginRight: 1 }}
            >
              Balance
            </Typography>
            <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
              {tokensBalances[parseInt(tokenId, 10)]}{' '}
              {tokensBalances[parseInt(tokenId, 10)] === 1 ? 'token' : 'tokens'}
            </Typography>
          </Box>
        </Box>
      ) : (
        'Error'
      )}
      <ClaimForm />
    </Box>
  );
}
