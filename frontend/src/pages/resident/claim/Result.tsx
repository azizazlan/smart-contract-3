import Box from '@mui/material/Box';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from '@mui/material';
import { useResidentDispatch } from '../../../services/hook';
import { resetClaimSubmission } from '../../../services/resident/reducer';

type ResultProps = {
  message: string;
};

export default function Result(props: ResultProps) {
  const { message } = props;
  const dispatch = useResidentDispatch();

  const handleClose = () => {
    dispatch(resetClaimSubmission());
  };

  return (
    <Box sx={{ margin: 3 }}>
      <Card sx={{ minWidth: 275, backgroundColor: '#f5f6fa' }}>
        <CardHeader title="Claim" />
        <CardContent>{message}</CardContent>
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
