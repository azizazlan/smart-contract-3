import React from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { isMobile } from 'react-device-detect';
import BasicTabs from './BasicTabs';
import initialize from '../../services/admin/thunks/initialize';
import { useAdminDispatch } from '../../services/hook';

export default function Landing() {
  const dispatch = useAdminDispatch();
  const [hasProvider, setHasProvider] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider)); // transform provider to true or false
    };
    getProvider();
  }, []);

  React.useEffect(() => {
    dispatch(initialize());
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
