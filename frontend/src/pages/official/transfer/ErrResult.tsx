import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { useOfficialDispatch } from '../../../services/hook';
import { resetWhitelistSubmission } from '../../../services/official/reducer';

export default function ErrResult(props: { message: string }) {
  const dispatch = useOfficialDispatch();

  const handleClose = () => {
    dispatch(resetWhitelistSubmission());
  };

  return (
    <Box sx={{ margin: 3 }}>
      <Card sx={{ minWidth: 275, backgroundColor: '#f5f6fa' }}>
        <CardHeader
          title={
            <Typography
              color="error"
              sx={{
                fontFamily: 'Oswald',
                fontSize: '16pt',
                fontWeight: 'bold',
              }}
            >
              Error
            </Typography>
          }
          subheader={
            <Typography
              color="error"
              sx={{
                fontFamily: 'Oswald',
                fontSize: '12pt',
              }}
            >
              Failed to transfer token
            </Typography>
          }
          sx={{ color: '#273c75' }}
        />
        <CardContent>
          <Typography color="error" variant="body2">
            {props.message}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="error" variant="outlined" onClick={handleClose}>
            close
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
