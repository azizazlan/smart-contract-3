import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="caption">
        Built with love for Melaka folks by Thuleen
      </Typography>
    </Box>
  );
}
