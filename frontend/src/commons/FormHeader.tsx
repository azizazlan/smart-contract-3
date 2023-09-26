import { Typography } from '@mui/material';

export type FormHeaderProps = {
  title: string;
};

export default function FormHeader(props: FormHeaderProps) {
  return (
    <Typography variant="h5" color="primary">
      {props.title}
    </Typography>
  );
}
