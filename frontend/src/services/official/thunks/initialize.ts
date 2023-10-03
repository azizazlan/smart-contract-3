import { createAsyncThunk } from '@reduxjs/toolkit';
import ethBal from './ethBal';
import checkStatus from './checkStatus';

const initialize = createAsyncThunk(
  'initialize_official',
  async (_, thunkAPI: any) => {
    setTimeout(() => {
      console.log('Delay completed after 3 seconds');
    }, 1000);

    const nric = localStorage.getItem('thuleen.mfs.official.nric');
    const publicKey = localStorage.getItem('thuleen.mfs.official.publicKey');
    const seedPhrase = localStorage.getItem('thuleen.mfs.official.seedPhrase');
    const isResident = !!localStorage.getItem(
      'thuleen.mfs.official.isResident'
    );
    const isOfficer = !!localStorage.getItem('thuleen.mfs.official.isOfficer');

    if (publicKey && nric) {
      thunkAPI.dispatch(checkStatus({ checkOfficer: true, nric, publicKey }));
      thunkAPI.dispatch(ethBal({ publicKey }));
    }

    return {
      nric,
      publicKey,
      seedPhrase,
      isResident,
      isOfficer,
    };
  }
);
export default initialize;
