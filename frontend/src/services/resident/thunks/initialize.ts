import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import checkStatus from './checkStatus';
import watchEvents from './watchEvents';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const initialize = createAsyncThunk(
  'resident_initialize',
  async (_, thunkAPI: any) => {
    const snric = localStorage.getItem('thuleen.mfs.resident.nric');
    const publicKey = localStorage.getItem('thuleen.mfs.resident.publicKey');
    const seedPhrase = localStorage.getItem('thuleen.mfs.resident.seedPhrase');
    const sBlockNumber = localStorage.getItem(
      'thuleen.mfs.resident.blockNumber'
    );
    const blockNumber = parseInt(sBlockNumber || `0`, 10);

    const stx = localStorage.getItem('thuleen.mfs.resident.transactions');
    const lastTransactions = JSON.parse(stx || `[]`);

    let nric = 0;
    let balanceEther = '0.0';
    if (publicKey && snric) {
      nric = parseInt(snric, 10);
      thunkAPI.dispatch(checkStatus({ nric, publicKey }));
      thunkAPI.dispatch(watchEvents({ nric, publicKey }));

      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const balanceWei = await provider.getBalance(publicKey);
      balanceEther = ethers.utils.formatEther(balanceWei);
    }

    return {
      nric,
      publicKey,
      seedPhrase,
      blockNumber,
      lastTransactions,
      balanceEther,
    };
  }
);
export default initialize;
