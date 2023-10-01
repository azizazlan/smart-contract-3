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
  title?: string;
  message: string;
  error: boolean;
  handleClickApprove?: () => void;
};

export default function Result(props: ResultProps) {
  const dispatch = useAdminDispatch();

  const { title, error, message, handleClickApprove } = props;

  const handleClose = () => {
    dispatch(resetSubmission());
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Card sx={{ minWidth: 275, backgroundColor: '#f5f6fa' }}>
        <CardHeader
          title={title ? title : 'Award residency'}
          sx={{ color: `${error ? 'red' : '#273c75'}` }}
        />
        {!error ? (
          <CardContent>{message}</CardContent>
        ) : (
          <CardContent sx={{ color: 'red' }}>{props.message}</CardContent>
        )}
        <CardActions sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleClose}>close</Button>
          {handleClickApprove ? (
            <Button variant="contained" onClick={handleClickApprove}>
              approve
            </Button>
          ) : null}
        </CardActions>
      </Card>
    </Box>
  );
}
