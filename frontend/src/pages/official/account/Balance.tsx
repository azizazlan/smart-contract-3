import React from 'react';
import { Alert, Box, IconButton, Snackbar, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import CopyToClipboard from 'react-copy-to-clipboard';

import truncateEthAddr from '../../../utils/truncateEthAddr';

export default function Balance({
  etherBal,
  publicKey,
  handleReloadBal,
}: {
  etherBal: string;
  publicKey: string;
  handleReloadBal: () => void;
}) {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = () => {
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '25px',
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isCopied}
        autoHideDuration={3000}
        onClose={() => setIsCopied(false)}
        message="Copied public key"
      >
        <Alert icon={false} severity="success" sx={{ width: '100%' }}>
          Copied public key 👍
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '17px',
          alignItems: 'center',
        }}
      >
        <Jazzicon diameter={55} seed={jsNumberForAddress(publicKey)} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            color="primary"
            style={{
              fontFamily: 'Oswald',
              fontSize: '16pt',
            }}
          >
            {truncateEthAddr(publicKey)}
          </Typography>
          <CopyToClipboard text={publicKey} onCopy={handleCopy}>
            <IconButton size="small">
              <ContentCopyIcon fontSize="small" color="primary" />
            </IconButton>
          </CopyToClipboard>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            color="primary"
            style={{
              fontFamily: 'Oswald',
              fontSize: '16pt',
            }}
          >
            {etherBal} Ξ
          </Typography>
          <IconButton onClick={handleReloadBal}>
            <ReplayIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}