import { Backdrop, CircularProgress } from '@mui/material';
import { SubmissionStates } from '../services/submissionState';

export default function BackdropLoader(props: {
  submissionState: SubmissionStates;
}) {
  const { submissionState } = props;
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={submissionState === 'PENDING'}
      onClick={() => console.log('Close backdrop')}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
