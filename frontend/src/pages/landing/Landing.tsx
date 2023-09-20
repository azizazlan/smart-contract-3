import { Box, Stack, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <Stack spacing={1} direction="column">
      <Button
        sx={{ minWidth: '235px' }}
        variant="contained"
        component={Link}
        to="/signup"
      >
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
      <Divider />
      <Button variant="outlined" color="primary">
        Verify resident
      </Button>
    </Stack>
  );
}
