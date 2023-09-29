import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

type SignupOfficialFields = {
  nric: string;
};

const signupOfficial = createAsyncThunk(
  'signup_official',
  async (props: SignupOfficialFields) => {
    const { nric } = props;
    const wallet = ethers.Wallet.createRandom();
    const publicKey = wallet.address;
    const seedPhrase = wallet.mnemonic.phrase;

    localStorage.setItem('thuleen.mfs.official.nric', nric);
    localStorage.setItem('thuleen.mfs.official.publicKey', publicKey);
    localStorage.setItem('thuleen.mfs.official.seedPhrase', seedPhrase);

    return {
      nric,
      publicKey,
      seedPhrase,
    };
  }
);
export default signupOfficial;
