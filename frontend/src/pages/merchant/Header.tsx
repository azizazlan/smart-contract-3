import { Box, Typography } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import merchantLogo from '../../assets/merchant.png';

type HeaderProps = {
  publicKey: string;
};

export default function Header(props: HeaderProps) {
  const { publicKey } = props;
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img
          src={merchantLogo}
          alt="merchant logo"
          style={{ width: 165, marginRight: 7 }}
        />
        <QRCodeCanvas size={156} value={`000000000000_${publicKey}`} />
      </Box>
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
