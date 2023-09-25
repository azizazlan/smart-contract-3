import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

type EthBalFields = {
  publicKey: string;
};

const ethBal = createAsyncThunk(
  'official_request_ethbal',
  async (props: EthBalFields) => {
    const { publicKey } = props;

    // Create a provider using the Ethereum RPC URL
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    try {
      // Get the Ether balance for the provided Ethereum address
      const balance = await provider.getBalance(publicKey);

      // Convert the balance to Ether (wei to Ether)
      const ethBalance = ethers.utils.formatEther(balance);

      return {
        ethBal: ethBalance,
      };
    } catch (error) {
      // Handle any errors here
      console.error('Error fetching Ether balance:', error);
      throw error;
    }
  }
);

export default ethBal;
