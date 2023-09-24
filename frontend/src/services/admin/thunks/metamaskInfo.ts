import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { utils } from 'ethers';

const metamaskInfo = createAsyncThunk('metamaskInfo', async () => {
  const provider = await detectEthereumProvider({ silent: true });

  let accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  console.log(accounts[0]);

  const bal = await window.ethereum!.request({
    method: 'eth_getBalance',
    params: [accounts[0], 'latest'],
  });
  const balance = utils.formatEther(bal);

  let chainIdHex = await window.ethereum.request({
    method: 'eth_chainId',
  });
  console.log(chainIdHex);
  const nchainId = parseInt(chainIdHex, 16);
  console.log(nchainId.toString());

  return {
    provider: provider,
    publicKey: accounts[0],
    etherBal: balance,
    networkId: nchainId.toString(),
  };
});
export default metamaskInfo;
