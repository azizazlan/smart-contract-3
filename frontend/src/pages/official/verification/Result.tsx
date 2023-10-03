import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  useOfficialDispatch,
  useOfficialSelector,
} from '../../../services/hook';
import { OfficialState } from '../../../services/store';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
} from '@mui/material';
import { resetVerifySubmission } from '../../../services/official/reducer';
import { TOKEN_NAMES } from '../../../services/subsidyType';
import TokenIcon from '../../../commons/TokenIcon';

export default function Result() {
  const dispatch = useOfficialDispatch();

  const { isClaimHasResidentId, isClaimWhitelisted, claimantTokenBals } =
    useOfficialSelector((state: OfficialState) => state.official);

  const handleClose = () => {
    dispatch(resetVerifySubmission());
  };

  return (
    <Box sx={{ margin: 3 }}>
      <Card sx={{ minWidth: 275, backgroundColor: '#f5f6fa' }}>
        <CardHeader
          title="Verification result"
          subheader="Resident Id & whitelisting status"
        />
        <CardContent>
          <Typography
            color="primary"
            variant="body1"
            sx={{ fontFamily: 'Oswald' }}
          >
            Resident Id
          </Typography>
          {isClaimHasResidentId ? (
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography>Resident</Typography>
              <CheckIcon color="primary" />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography>Non-resident</Typography>
              <CloseIcon color="primary" />
            </Box>
          )}
          <Typography
            color="primary"
            variant="body1"
            sx={{ fontFamily: 'Oswald', marginTop: 1 }}
          >
            Whitelisting
          </Typography>
          {isClaimWhitelisted ? (
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography>Whitelisted</Typography>
              <CheckIcon color="primary" />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography>Not in the whitelist</Typography>
              <CloseIcon color="primary" />
            </Box>
          )}
          <Typography
            color="primary"
            variant="body1"
            sx={{ fontFamily: 'Oswald', marginTop: 1 }}
          >
            Tokens
          </Typography>
          {claimantTokenBals.map((balance, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TokenIcon index={index} />
              <Typography key={index} variant="body1" sx={{ marginLeft: 1 }}>
                {TOKEN_NAMES[index]}: {balance} tokens
              </Typography>
            </Box>
          ))}
        </CardContent>
        <CardActions sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" onClick={handleClose}>
            close
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
