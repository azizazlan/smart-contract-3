import { createAsyncThunk } from '@reduxjs/toolkit';
import watchEvents from './watchEvents';

const initialize = createAsyncThunk(
  'merchant_initialize',
  async (_, thunkAPI: any) => {
    const publicKey = localStorage.getItem('thuleen.mfs.merchant.publicKey');
    const seedPhrase = localStorage.getItem('thuleen.mfs.merchant.seedPhrase');
    const slastBlockNumber = localStorage.getItem(
      'thuleen.mfs.merchant.lastBlockNumber'
    );
    const lastBlockNumber = parseInt(slastBlockNumber || `0`, 10);

    if (!publicKey || !seedPhrase) {
      return thunkAPI.rejectWithValue({
        message:
          'Merchant public key does not exist. Click to signup' as string,
      });
    }
    const stxs = localStorage.getItem('thuleen.mfs.merchant.transactions');
    const lastTransactions = JSON.parse(stxs || `[]`);

    thunkAPI.dispatch(watchEvents({ publicKey }));

    const message = 'Successfully initialized merchant';

    return {
      publicKey,
      seedPhrase,
      lastBlockNumber,
      lastTransactions,
      message,
    };
  }
);
export default initialize;
