import { createAsyncThunk } from '@reduxjs/toolkit';
import ethBal from './ethBal';
import checkStatus from './checkStatus';
import watchEvents from './watchEvents';

const initialize = createAsyncThunk(
  'official_initialize',
  async (_, thunkAPI: any) => {
    setTimeout(() => {
      console.log('Delay completed after 3 seconds');
    }, 1000);

    const snric = localStorage.getItem('thuleen.mfs.official.nric');
    const publicKey = localStorage.getItem('thuleen.mfs.official.publicKey');
    const seedPhrase = localStorage.getItem('thuleen.mfs.official.seedPhrase');

    let nric = 0;
    let qrcode = '';
    if (publicKey && snric) {
      nric = parseInt(snric, 10);
      qrcode = `${snric}_${publicKey}`;
      thunkAPI.dispatch(checkStatus({ nric, publicKey }));
      thunkAPI.dispatch(ethBal({ publicKey }));
      thunkAPI.dispatch(watchEvents({ nric, publicKey }));
    }

    return {
      nric,
      qrcode,
      publicKey,
      seedPhrase,
    };
  }
);
export default initialize;
