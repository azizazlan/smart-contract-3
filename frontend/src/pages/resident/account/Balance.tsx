import React from 'react';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import rice from '../../../assets/bag-rice.png';
import flour from '../../../assets/bag-wheatflour.png';
import blank from '../../../assets/blank.png';

export default function Balance() {
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
          marginTop: '17px',
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
      <Box sx={{ marginTop: 2 }}>
        <Carousel showThumbs={false}>
          <div>
            <img src={rice} style={{ width: '75px' }} />
            <p className="legend">Bag 70kg of Rice</p>
          </div>
          <div>
            <img src={flour} style={{ width: '75px' }} />
            <p className="legend">Bag 1kg of Wheat Flour 2</p>
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
