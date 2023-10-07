import { createAsyncThunk } from '@reduxjs/toolkit';
import checkStatus from './checkStatus';
import watchEvents from './watchEvents';

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

    let nric = 0;
    if (publicKey && snric) {
      nric = parseInt(snric, 10);
      thunkAPI.dispatch(checkStatus({ nric, publicKey }));
      thunkAPI.dispatch(watchEvents({ nric, publicKey }));
    }

    return {
      nric,
      publicKey,
      seedPhrase,
      blockNumber,
    };
  }
);
export default initialize;
