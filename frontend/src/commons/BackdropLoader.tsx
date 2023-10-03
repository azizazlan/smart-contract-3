import { Backdrop, CircularProgress, Typography } from '@mui/material';
import { SubmissionStates } from '../services/submissionState';

export default function BackdropLoader(props: {
  submissionState: SubmissionStates;
  message?: string;
}) {
  const { message, submissionState } = props;
  return (
    <Backdrop
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={submissionState === 'PENDING'}
      onClick={() => console.log('Close backdrop')}
    >
      <CircularProgress color="inherit" />
      <Typography variant="caption">{message}</Typography>
    </Backdrop>
  );
}
