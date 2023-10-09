import React from 'react';
import { Alert, Box, IconButton, Snackbar, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { QRCodeCanvas } from 'qrcode.react';
import merchantLogo from '../../assets/merchant.png';
import truncateEthAddr from '../../utils/truncateEthAddr';
import CopyToClipboard from 'react-copy-to-clipboard';

type HeaderProps = {
  publicKey: string;
};

export default function Header(props: HeaderProps) {
  const { publicKey } = props;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={copied}
        autoHideDuration={3000}
        onClose={() => setCopied(false)}
        message="Copied public key"
      >
        <Alert icon={false} severity="success" sx={{ width: '100%' }}>
          Copied public key 🎉
        </Alert>
      </Snackbar>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img
          src={merchantLogo}
          alt="merchant logo"
          style={{ width: 165, marginRight: 7 }}
        />
        <QRCodeCanvas size={156} value={`000000000000_${publicKey}`} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Oswald',
            fontSize: '12pt',
            marginRight: 1,
            color: 'silver',
          }}
        >
          Merchant public key
        </Typography>
        <CopyToClipboard text={publicKey} onCopy={handleCopy}>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Typography sx={{ fontFamily: 'Oswald', fontSize: '12pt' }}>
              {truncateEthAddr(publicKey)}
            </Typography>
            <IconButton size="small">
              <ContentCopyIcon fontSize="small" color="primary" />
            </IconButton>
          </Box>
        </CopyToClipboard>
      </Box>
    </Box>
  );
}
