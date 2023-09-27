import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { useAdminDispatch } from '../../services/hook';
import { resetSubmission } from '../../services/admin/reducer';

type ResultProps = {
  message: string;
  error: boolean;
};

export default function Result(props: ResultProps) {
  const dispatch = useAdminDispatch();

  const handleClose = () => {
    dispatch(resetSubmission());
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Card sx={{ minWidth: 275, backgroundColor: '#f5f6fa' }}>
        <CardHeader
          title="Award residency"
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
