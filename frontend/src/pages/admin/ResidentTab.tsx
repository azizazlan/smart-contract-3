import { Box, TextField, Button, Divider, FormControl } from '@mui/material';

export default function ResidentTab() {
  return (
    <Box sx={{ marginTop: 0 }}>
      <FormControl fullWidth margin="normal">
        <TextField
          InputLabelProps={{ shrink: true }}
          id="outlined-basic"
          label="NRIC"
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          InputLabelProps={{ shrink: true }}
          id="outlined-basic"
          label="Public key"
          variant="outlined"
          helperText="Resident public key. Eg: 0xd4C94252d9a182FBEd2b0576F07778470F2h2835"
        />
      </FormControl>
      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 3 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" color="secondary">
          revoke
        </Button>
        <Divider sx={{ minWidth: 5 }} />
        <Button variant="contained" sx={{ backgroundColor: '#1B1464' }}>
          award residency
        </Button>
      </Box>
    </Box>
  );
}
