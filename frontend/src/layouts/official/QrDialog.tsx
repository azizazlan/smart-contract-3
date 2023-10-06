import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import { QRCodeCanvas } from 'qrcode.react';
import truncateEthAddr from '../../utils/truncateEthAddr';
import { DialogActions } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function QrDialog({
  qrcode,
  open,
  handleClose,
}: {
  qrcode: string | null;
  open: boolean;
  handleClose: () => void;
}) {
  let nric;
  let publicKey;
  let qrcodeSplits = qrcode?.split('_');

  if (qrcodeSplits) {
    nric = qrcodeSplits[0];
    publicKey = qrcodeSplits[1];
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative', backgroundColor: 'black' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            QR code
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            close
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: '100%',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        {qrcode && nric && publicKey ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <QRCodeCanvas size={256} fgColor="black" value={qrcode} />
            <Typography
              color="primary"
              sx={{ marginTop: 3, fontFamily: 'Oswald', fontSize: '14pt' }}
            >
              {nric}
            </Typography>
            <Typography
              color="primary"
              sx={{ marginTop: 0, fontFamily: 'Oswald', fontSize: '14pt' }}
            >
              {truncateEthAddr(publicKey)}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2" color="error">
            Error
          </Typography>
        )}
      </Box>
      <DialogActions sx={{ paddingBottom: 3, paddingRight: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
