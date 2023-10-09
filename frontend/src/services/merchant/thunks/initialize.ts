import { createAsyncThunk } from '@reduxjs/toolkit';

const initialize = createAsyncThunk(
  'merchant_initialize',
  async (_, { rejectWithValue }) => {
    const publicKey = localStorage.getItem('thuleen.mfs.merchant.publicKey');
    const seedPhrase = localStorage.getItem('thuleen.mfs.merchant.seedPhrase');

    if (!publicKey || !seedPhrase) {
      return rejectWithValue({
        message:
          'Merchant public key does not exist. Click to signup' as string,
      });
    }

    const message = 'Successfully initialized merchant';

    return {
      publicKey,
      seedPhrase,
      message,
    };
  }
);
export default initialize;
