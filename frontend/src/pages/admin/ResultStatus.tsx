import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { useAdminDispatch } from '../../services/hook';
import { resetSubmission } from '../../services/admin/reducer';

type ResultStatusProps = {
  message: string;
  error: boolean;
  isResident: boolean;
  isOfficer: boolean;
  isWhitelisted: boolean;
};

export default function ResultStatus(props: ResultStatusProps) {
  const dispatch = useAdminDispatch();

  const handleClose = () => {
    dispatch(resetSubmission());
  };

  if (props.error) {
    return (
      <Box sx={{ margin: 2 }}>
        <Card sx={{ minWidth: 275, backgroundColor: '#f5f6fa' }}>
          <CardHeader
            title="Verify status"
            sx={{ color: `${props.error ? 'red' : '#273c75'}` }}
          />
          {!props.error ? (
            <CardContent>{props.message}</CardContent>
          ) : (
            <CardContent sx={{ color: 'red' }}>{props.message}</CardContent>
          )}
          <CardActions sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleClose}>close</Button>
          </CardActions>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ margin: 2 }}>
      <Card sx={{ minWidth: 275, backgroundColor: '#f5f6fa' }}>
        <CardHeader title="Verify status" sx={{ color: '#273c75' }} />
        <CardContent>
          <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
            Residency status
          </Typography>
          <Typography gutterBottom>
            {props.isResident ? 'Resident ✅' : 'Non-resident ✖'}
          </Typography>
          <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
            Official role
          </Typography>
          <Typography gutterBottom>
            {props.isOfficer ? 'Officer ✅' : 'Non-officer ✖'}
          </Typography>
          <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
            Whitelisting
          </Typography>
          <Typography gutterBottom>
            {props.isWhitelisted ? 'Whitelisted ✅' : 'No ✖'}
          </Typography>
        </CardContent>
        <CardContent>{props.message}</CardContent>
        <CardActions sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleClose}>close</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
