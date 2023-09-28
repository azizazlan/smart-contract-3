import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const web3Info = createAsyncThunk('app_web3_info', async () => {
  // Create a provider using the Ethereum RPC URL
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const network = await provider.getNetwork();
  const networkId = network.chainId.toString();

  return {
    networkId,
    message: 'Successfully request web3 info',
  };
});
export default web3Info;
