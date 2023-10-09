import { Box, Typography } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';

type HeaderProps = {
  publicKey: string;
};

export default function Header(props: HeaderProps) {
  const { publicKey } = props;
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <QRCodeCanvas size={156} value={`000000000000_${publicKey}`} />
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography
          sx={{
            fontFamily: 'Oswald',
            fontSize: '12pt',
            marginRight: 1,
          }}
        >
          Merchant
        </Typography>
        <Typography sx={{ fontFamily: 'Oswald', fontSize: '12pt' }}>
          {publicKey}
        </Typography>
      </Box>
    </Box>
  );
}
