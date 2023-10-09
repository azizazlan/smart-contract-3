import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

const signup = createAsyncThunk(
  'merchant_signup',
  async (_, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const wallet = ethers.Wallet.createRandom();
    const publicKey = wallet.address;
    const seedPhrase = wallet.mnemonic.phrase;

    if (!publicKey || !seedPhrase) {
      return rejectWithValue({
        message:
          'Merchant public key does not exist. Click to signup' as string,
      });
    }

    localStorage.setItem('thuleen.mfs.merchant.publicKey', publicKey);
    localStorage.setItem('thuleen.mfs.merchant.seedPhrase', seedPhrase);

    const message = 'Successfully merchant signup';

    return {
      publicKey,
      seedPhrase,
      message,
    };
  }
);
export default signup;
