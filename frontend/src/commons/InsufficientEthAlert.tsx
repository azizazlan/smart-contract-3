import Alert from '@mui/material/Alert';

export default function InsufficientEthAlert() {
  return (
    <Alert severity="warning" sx={{ marginBottom: 2 }}>
      Insufficient ETH balance. Transaction will failed. Request some ETH from
      MES Admin.
    </Alert>
  );
}
