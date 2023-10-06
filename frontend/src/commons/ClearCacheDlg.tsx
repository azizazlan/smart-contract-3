import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MemoryIcon from '@mui/icons-material/Memory';

type ClearCacheDlgProps = {
  open: boolean;
  handleClose: () => void;
  handleClear: () => void;
};

export default function ClearCacheDlg(props: ClearCacheDlgProps) {
  const { open, handleClose, handleClear } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle
        sx={{ display: 'flex', flexDirection: 'row' }}
        id="responsive-dialog-title"
      >
        <Typography
          sx={{
            fontSize: '17pt',
            fontFamily: 'Oswald',
            fontWeight: 'bold',
            color: 'red',
          }}
        >
          Clear cache
        </Typography>
        <MemoryIcon sx={{ color: 'grey' }} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ensure you have a copy of your unique 12 seed phrases. You can restore
          your account using the phrases later.
          <br />
          <br />
          Click <span style={{ fontFamily: 'Oswald' }}>CLEAR</span> to clear
          cache.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleClear}
          autoFocus
        >
          clear
        </Button>
      </DialogActions>
    </Dialog>
  );
}
