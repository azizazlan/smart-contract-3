import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

type SignupOfficialFields = {
  nric: number;
};

const signupOfficial = createAsyncThunk(
  'official_signup',
  async (props: SignupOfficialFields) => {
    const { nric } = props;
    const wallet = ethers.Wallet.createRandom();
    const publicKey = wallet.address;
    const seedPhrase = wallet.mnemonic.phrase;

    localStorage.setItem('thuleen.mfs.official.nric', nric.toString());
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
