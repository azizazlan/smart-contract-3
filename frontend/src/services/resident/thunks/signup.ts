import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

type SignupResidentFields = {
  nric: string;
};

const signupResident = createAsyncThunk(
  'signup_resident',
  async (props: SignupResidentFields) => {
    const { nric } = props;
    const wallet = ethers.Wallet.createRandom();
    const publicKey = wallet.address;
    const seedPhrase = wallet.mnemonic.phrase;

    localStorage.setItem('thuleen.mfs.resident.nric', nric);
    localStorage.setItem('thuleen.mfs.resident.publicKey', publicKey);
    localStorage.setItem('thuleen.mfs.resident.seedPhrase', seedPhrase);

    return {
      nric,
      publicKey,
      seedPhrase,
    };
  }
);
export default signupResident;
