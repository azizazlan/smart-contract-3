import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../services/hook';
import { AppState } from '../services/store';
import web3Info from '../services/app/thunks/web3Info';

export default function Footer() {
  const dispatch = useAppDispatch();
  const { networkId } = useAppSelector((state: AppState) => state.app);

  React.useEffect(() => {
    dispatch(web3Info());
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="caption" sx={{ color: 'silver' }}>
        Network id {networkId}
        <br />
        Built with love for{' '}
        <Link
          to="/official"
          style={{ textDecoration: 'none', color: 'silver' }}
        >
          Melaka
        </Link>{' '}
        <Link to="/" style={{ textDecoration: 'none', color: 'silver' }}>
          folks{' '}
        </Link>
        by{' '}
        <Link
          to="/admin"
          style={{
            fontFamily: 'Oswald',
            textDecoration: 'none',
            color: 'silver',
          }}
        >
          thuleen
        </Link>
      </Typography>
    </Box>
  );
}
