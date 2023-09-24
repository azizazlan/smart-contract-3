import React from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import BasicTabs from './BasicTabs';

export default function Landing() {
  const [hasProvider, setHasProvider] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider)); // transform provider to true or false
    };

    getProvider();
  }, []);

  if (!hasProvider) {
    return (
      <Box>
        <Typography color="error" variant="body2">
          Please install Metamask, refresh this page and connect to the
          Metamask.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '90%', margin: 3 }}>
      <BasicTabs />
    </Box>
  );
}
