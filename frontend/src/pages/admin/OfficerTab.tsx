import { Box, TextField, Button, Divider, FormControl } from '@mui/material';

export default function OfficerTab() {
  return (
    <Box sx={{ marginTop: 0 }}>
      <FormControl fullWidth margin="normal">
        <TextField
          InputLabelProps={{ shrink: true }}
          id="outlined-basic"
          label="Public key"
          variant="outlined"
          helperText="Officer public key."
        />
      </FormControl>
      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 3 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" color="secondary">
          revoke
        </Button>
        <Divider sx={{ minWidth: 5 }} />
        <Button variant="contained" sx={{ backgroundColor: '#40739e' }}>
          assign role
        </Button>
      </Box>
    </Box>
  );
}
