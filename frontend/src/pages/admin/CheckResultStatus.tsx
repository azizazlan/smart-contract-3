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
import { TOKEN_NAMES } from '../../services/subsidyType';

type ResultStatusProps = {
  message: string;
  error: boolean;
  hasResidentId: boolean;
  hasMinterRole: boolean;
  allowances: number[];
};

export default function CheckResultStatus(props: ResultStatusProps) {
  const dispatch = useAdminDispatch();

  const handleClose = () => {
    dispatch(resetSubmission());
  };

  if (props.error) {
    return (
      <Box sx={{ margin: 2 }}>
        <Card sx={{ minWidth: 275, backgroundColor: '#f5f6fa' }}>
          <CardHeader
            title="Check status"
            sx={{ color: `${props.error ? 'red' : '#273c75'}` }}
          />
          {!props.error ? (
            <CardContent>{props.message}</CardContent>
          ) : (
            <CardContent sx={{ color: 'red' }}>{props.message}</CardContent>
          )}
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

  return (
    <Box sx={{ margin: 2 }}>
      <Card sx={{ minWidth: 275, backgroundColor: '#f5f6fa' }}>
        <CardHeader title="Check status" sx={{ color: '#273c75' }} />
        <CardContent>
          <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
            Residency status
          </Typography>
          <Typography gutterBottom>
            {props.hasResidentId
              ? 'Resident Id ✅'
              : 'Do not have resident id ✖'}
          </Typography>
          <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
            Official role
          </Typography>
          <Typography gutterBottom>
            {props.hasMinterRole ? 'Minter ✅' : 'Not a minter ✖'}
          </Typography>
          <Typography color="primary" sx={{ fontFamily: 'Oswald' }}>
            Allowances
          </Typography>
          {props.allowances.map((allowance, index) => (
            <Typography key={index} variant="body1">
              {TOKEN_NAMES[index]}: {allowance} tokens
            </Typography>
          ))}
        </CardContent>
        <CardContent>{props.message}</CardContent>
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
