import React from 'react';
import Box from '@mui/material/Box';
import styles from './styles';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { jsNumberForAddress } from 'react-jazzicon';
import { useResidentSelector } from '../../../services/hook';
import { ResidentState } from '../../../services/store';
import { Alert, IconButton, Snackbar, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import truncateEthAddr from '../../../utils/truncateEthAddr';
import Seedphrase from './Seedphrase';

export default function Account() {
  const [copied, setCopied] = React.useState(false);
  const [copiedSeedphrase, setCopiedSeedphrase] = React.useState(false);
  const { publicKey, seedPhrase } = useResidentSelector(
    (state: ResidentState) => state.resident
  );

  if (!publicKey || !seedPhrase) {
    return <Box>Error</Box>;
  }

  const handleCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleCopySeedphrase = () => {
    setCopiedSeedphrase(true);

    setTimeout(() => {
      setCopiedSeedphrase(false);
    }, 3000);
  };

  return (
    <Box sx={{ ...styles.container, marginTop: 3, alignItems: 'center' }}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={copied}
        autoHideDuration={3000}
        onClose={() => setCopied(false)}
        message="Copied public key"
      >
        <Alert icon={false} severity="success" sx={{ width: '100%' }}>
          Copied public key 👍
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={copiedSeedphrase}
        autoHideDuration={3000}
        onClose={() => setCopiedSeedphrase(false)}
        message="Copied seedphrase"
      >
        <Alert icon={false} severity="success" sx={{ width: '100%' }}>
          Copied seedphrase 👍
        </Alert>
      </Snackbar>
      <Jazzicon diameter={55} seed={jsNumberForAddress(publicKey)} />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography
          color="primary"
          style={{
            fontFamily: 'Oswald',
            fontSize: '16pt',
          }}
        >
          {truncateEthAddr(publicKey || 'error')}
        </Typography>
        <CopyToClipboard text={publicKey} onCopy={handleCopy}>
          <IconButton size="small">
            <ContentCopyIcon fontSize="small" color="primary" />
          </IconButton>
        </CopyToClipboard>
      </Box>
      <Seedphrase seedPhrase={seedPhrase} handleCopy={handleCopySeedphrase} />
    </Box>
  );
}
