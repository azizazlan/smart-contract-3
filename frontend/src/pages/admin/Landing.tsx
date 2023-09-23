import React from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Box from '@mui/material/Box';
import { Divider, TextField, Typography } from '@mui/material';
import { default as ActionsTab } from './ActionsTab';

export default function Landing() {
  const [hasProvider, setHasProvider] = React.useState<boolean | null>(null);
  const [chainId, setChainId] = React.useState<string | null>(null);
  const [publicKey, setPublicKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider)); // transform provider to true or false

      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log(accounts[0]);
      setPublicKey(accounts[0]);

      let chainIdHex = await window.ethereum.request({
        method: 'eth_chainId',
      });
      console.log(chainIdHex);
      const nchainId = parseInt(chainIdHex, 16);
      console.log(nchainId.toString());
      setChainId(nchainId.toString());
    };

    getProvider();
  }, []);

  if (!hasProvider) {
    return (
      <Box>
        <Typography color="error" variant="body2">
          Please install Metamask, refresh this page and connect to the
          Metamask.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minWidth: '525px' }}>
      {hasProvider ? (
        <Box>
          <Typography
            color="primary"
            sx={{ fontFamily: 'Oswald', fontSize: '14pt' }}
          >
            Network Id
          </Typography>
          <Typography sx={{ fontFamily: 'Abel' }}>{chainId}</Typography>
          <Typography
            color="primary"
            sx={{ fontFamily: 'Oswald', fontSize: '14pt' }}
          >
            Public key
          </Typography>
          <Typography sx={{ fontFamily: 'Abel' }}>{publicKey}</Typography>
          <Typography
            color="primary"
            sx={{ fontFamily: 'Oswald', fontSize: '14pt' }}
          >
            Ether balance
          </Typography>
          <Typography sx={{ fontFamily: 'Abel' }}>todo</Typography>
          <ActionsTab />
        </Box>
      ) : null}
    </Box>
  );
}
