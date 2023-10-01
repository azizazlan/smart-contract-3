import React from 'react';
import { Alert, Box, IconButton, Snackbar, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import CopyToClipboard from 'react-copy-to-clipboard';

import truncateEthAddr from '../../../utils/truncateEthAddr';
import { Link } from 'react-router-dom';

export default function Balance({
  etherBal,
  publicKey,
  handleReloadBal,
  allowTokens,
  handleAllowsBal,
}: {
  etherBal: string;
  publicKey: string;
  allowTokens: string;
  handleReloadBal: () => void;
  handleAllowsBal: () => void;
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
            Ξ {etherBal}
          </Typography>
          <IconButton onClick={handleReloadBal}>
            <ReplayIcon sx={{ color: 'silver' }} fontSize="small" />
          </IconButton>
        </Box>
        <Typography
          style={{
            fontFamily: 'Oswald',
            fontSize: '12pt',
            color: 'silver',
            marginRight: '3px',
            marginTop: 21,
          }}
        >
          Rice tokens allowance
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <IconButton component={Link} to="transfer">
            <FileUploadIcon color="secondary" fontSize="small" />
          </IconButton>
          <Typography
            color="primary"
            style={{
              marginLeft: 7,
              marginRight: 7,
              fontFamily: 'Oswald',
              fontSize: '16pt',
            }}
          >
            {allowTokens}
          </Typography>
          <IconButton onClick={handleAllowsBal}>
            <ReplayIcon sx={{ color: 'silver' }} fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
