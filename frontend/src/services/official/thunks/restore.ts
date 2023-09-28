import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import truncateEthAddr from '../../../utils/truncateEthAddr';

type RestoreFields = {
  nric: string;
  seedPhrase: string;
};

const restore = createAsyncThunk(
  'official_restore',
  async (props: RestoreFields) => {
    const { nric, seedPhrase } = props;

    const wallet = ethers.Wallet.fromMnemonic(seedPhrase);
    const publicKey = wallet.address;

    localStorage.setItem('thuleen.mfs.official.nric', nric);
    localStorage.setItem('thuleen.mfs.official.publicKey', publicKey);
    localStorage.setItem('thuleen.mfs.official.seedPhrase', seedPhrase);

    const message = `Successfully restored ${truncateEthAddr(publicKey)}`;

    return {
      nric,
      publicKey,
      seedPhrase,
      message,
    };
  }
);
export default restore;
