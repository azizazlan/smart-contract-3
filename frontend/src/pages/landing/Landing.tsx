import { Box, Stack, Button } from '@mui/material';
import flag from '../../assets/malacca-flag.png';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={{ paddingTop: '50px' }}>
        <img src={flag} alt="melaka flag" style={{ width: '250px' }} />
      </Box>
      <Box sx={{ padding: 9, width: '250px' }}>
        <Stack spacing={2} direction="column">
          <Button variant="contained" component={Link} to="/signup">
            resident signup
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/restore"
          >
            Restore
          </Button>
          <Button variant="outlined" color="primary">
            Verify resident
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
