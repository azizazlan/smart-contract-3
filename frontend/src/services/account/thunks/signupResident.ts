import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

type SignupResidentFields = {
  nric: string;
};

const signupResident = createAsyncThunk(
  'signupResident',
  async (props: SignupResidentFields) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { nric } = props;
    const wallet = ethers.Wallet.createRandom();
    const publicKey = wallet.address;
    const seedPhrase = wallet.mnemonic.phrase;

    return {
      nric,
      publicKey,
      seedPhrase,
    };
  }
);
export default signupResident;
