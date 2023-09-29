import { createAsyncThunk } from '@reduxjs/toolkit';
import checkStatus from './checkStatus';

const initialize = createAsyncThunk(
  'initialize_resident_account',
  async (_, thunkAPI: any) => {
    const nric = localStorage.getItem('thuleen.mfs.resident.nric');
    const publicKey = localStorage.getItem('thuleen.mfs.resident.publicKey');
    const seedPhrase = localStorage.getItem('thuleen.mfs.resident.seedPhrase');

    if (publicKey && nric) thunkAPI.dispatch(checkStatus({ nric, publicKey }));

    return {
      nric,
      publicKey,
      seedPhrase,
    };
  }
);
export default initialize;
