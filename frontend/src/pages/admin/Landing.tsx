import React from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { isMobile } from 'react-device-detect';
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

  if (isMobile) {
    return (
      <Box sx={{ margin: 3 }}>
        <Typography variant="body1" color="primary" gutterBottom>
          This application is designed for desktop usages.
        </Typography>
        <Typography variant="body1" color="primary" gutterBottom>
          Please switch to desktop browser and refresh this page.
        </Typography>
      </Box>
    );
  }

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

  return <BasicTabs />;
}
