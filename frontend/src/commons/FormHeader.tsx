import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export type FormHeaderProps = {
  title: string;
  cancelUrl?: string;
};

export default function FormHeader(props: FormHeaderProps) {
  const navigate = useNavigate();
  const { title, cancelUrl } = props;

  const handleClose = () => {
    navigate(`${cancelUrl}`);
  };

  if (cancelUrl) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography sx={{ flexGrow: 1 }} variant="h5" color="primary">
          {title}
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    );
  }
  return (
    <Typography variant="h5" color="primary">
      {title}
    </Typography>
  );
}
