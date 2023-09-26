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

export default function Result() {
  const dispatch = useOfficialDispatch();

  const { isClaimResident, isClaimWhitelisted } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  const handleClose = () => {
    dispatch(resetVerifySubmission());
  };

  return (
    <Box sx={{ margin: 3 }}>
      <Card sx={{ minWidth: 275, backgroundColor: '#f5f6fa' }}>
        <CardHeader
          title="Result"
          subheader="Residency & whitelisting status"
        />
        <CardContent>
          <Typography
            color="primary"
            variant="body1"
            sx={{ fontFamily: 'Oswald' }}
          >
            Residency
          </Typography>
          <Typography variant="body2" gutterBottom>
            {isClaimResident ? (
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
          </Typography>
          <Typography
            color="primary"
            variant="body1"
            sx={{ fontFamily: 'Oswald' }}
          >
            Whitelisting
          </Typography>
          <Typography variant="body2">
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
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleClose}>close</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
