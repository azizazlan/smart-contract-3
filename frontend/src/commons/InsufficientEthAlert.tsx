import Alert from '@mui/material/Alert';

export default function InsufficientEthAlert() {
  return (
    <Alert severity="warning" sx={{ marginBottom: 2 }}>
      Insufficient ETH balance. Transaction will failed. Request ETH from admin.
    </Alert>
  );
}
