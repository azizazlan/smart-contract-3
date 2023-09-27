import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Wallet, utils } from 'ethers';

const METAMASK_PRIVATE_KEY = import.meta.env.VITE_APP_METAMASK_PRIVATE_KEY;

const metamaskInfo = createAsyncThunk('metamaskInfo', async () => {
  const provider = await detectEthereumProvider({ silent: true });
  if (!provider) {
    console.log('Provider is null');
    return;
  }
  const web3Provider = new ethers.providers.Web3Provider(provider);
  const metaMaskWallet = new Wallet(METAMASK_PRIVATE_KEY, web3Provider);

  const bal = await window.ethereum!.request({
    method: 'eth_getBalance',
    params: [metaMaskWallet.address, 'latest'],
  });
  const balance = utils.formatEther(bal);

  let chainIdHex = await window.ethereum.request({
    method: 'eth_chainId',
  });
  console.log(chainIdHex);
  const nchainId = parseInt(chainIdHex, 16);
  console.log(nchainId.toString());

  return {
    publicKey: metaMaskWallet.address,
    etherBal: balance,
    networkId: nchainId.toString(),
    message: 'Successfully request metamask info',
  };
});
export default metamaskInfo;
