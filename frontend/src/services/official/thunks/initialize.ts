import { createAsyncThunk } from '@reduxjs/toolkit';
import ethBal from './ethBal';
import checkStatus from './checkStatus';
import watchTransferEvent from './watchTransferEvent';

const initialize = createAsyncThunk(
  'initialize_official',
  async (_, thunkAPI: any) => {
    setTimeout(() => {
      console.log('Delay completed after 3 seconds');
    }, 1000);

    const snric = localStorage.getItem('thuleen.mfs.official.nric');
    const publicKey = localStorage.getItem('thuleen.mfs.official.publicKey');
    const seedPhrase = localStorage.getItem('thuleen.mfs.official.seedPhrase');

    let nric = 0;
    if (publicKey && snric) {
      nric = parseInt(snric, 10);
      thunkAPI.dispatch(checkStatus({ nric, publicKey }));
      thunkAPI.dispatch(ethBal({ publicKey }));

      thunkAPI.dispatch(watchTransferEvent({ nric, publicKey }));
    }

    return {
      nric,
      publicKey,
      seedPhrase,
    };
  }
);
export default initialize;
