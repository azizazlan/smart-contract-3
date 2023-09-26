import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { useOfficialDispatch } from '../../../services/hook';
import { resetResidencySubmission } from '../../../services/official/reducer';

export default function Result(props: { message: string }) {
  const dispatch = useOfficialDispatch();

  const handleClose = () => {
    dispatch(resetResidencySubmission());
  };

  return (
    <Box sx={{ margin: 3 }}>
      <Card sx={{ minWidth: 275, backgroundColor: '#f5f6fa' }}>
        <CardHeader title="Result" sx={{ color: '#273c75' }} />
        <CardContent>{props.message}</CardContent>
        <CardActions sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleClose}>close</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
