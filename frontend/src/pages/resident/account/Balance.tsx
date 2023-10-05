import React from 'react';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import rice from '../../../assets/bag-rice.png';
import flour from '../../../assets/bag-wheatflour.png';
import blank from '../../../assets/blank.png';
import { Link } from 'react-router-dom';
import { TokenBalance } from '../../../utils/subsidyUtils';

type BalanceProps = {
  tokenBalances: TokenBalance[];
};

export default function Balance(props: BalanceProps) {
  const { tokenBalances } = props;
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 1,
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
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography
          style={{
            fontFamily: 'Oswald',
            fontSize: '12pt',
            color: 'silver',
            marginRight: 1,
          }}
        >
          Subsidy tokens
        </Typography>
      </Box>
      <Box sx={{ marginTop: 5 }}>
        <Carousel showThumbs={false}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={rice} style={{ marginTop: 1, width: '75px' }} />
            <Typography
              color="primary"
              sx={{ fontSize: '16pt', marginTop: 2, fontFamily: 'Oswald' }}
            >
              {tokenBalances[0].balance}{' '}
              {tokenBalances[0].balance === 1 ? 'token' : 'tokens'}
            </Typography>
            <Link to="txhistory">
              <p className="legend">Bag 70kg of Rice</p>
            </Link>
          </Box>
          <div>
            <img src={flour} style={{ marginTop: 1, width: '75px' }} />
            <Typography
              color="primary"
              sx={{ fontSize: '16pt', marginTop: 2, fontFamily: 'Oswald' }}
            >
              {tokenBalances[1].balance}{' '}
              {tokenBalances[1].balance === 1 ? 'token' : 'tokens'}
            </Typography>
            <Link to="txhistory">
              <p className="legend">Bag 1kg of Wheat Flour 2</p>
            </Link>
          </div>
          <div>
            <img src={blank} style={{ width: '175px' }} />
            <p className="legend">-intentionally blank-</p>
          </div>
        </Carousel>
      </Box>
    </Box>
  );
}
