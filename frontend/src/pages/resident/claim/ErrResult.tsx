import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { useResidentDispatch } from '../../../services/hook';
import { resetClaimSubmission } from '../../../services/resident/reducer';

export default function ErrResult(props: { message: string }) {
  const dispatch = useResidentDispatch();

  const handleClose = () => {
    dispatch(resetClaimSubmission());
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
              Failed to claim
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
          <Button variant="outlined" color="error" onClick={handleClose}>
            close
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
