import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import truncateEthAddr from '../../../utils/truncateEthAddr';

type RestoreFields = {
  nric: number;
  seedPhrase: string;
};

const restore = createAsyncThunk(
  'resident_restore',
  async (props: RestoreFields) => {
    const { nric, seedPhrase } = props;

    const wallet = ethers.Wallet.fromMnemonic(seedPhrase);
    const publicKey = wallet.address;

    localStorage.setItem('thuleen.mfs.resident.nric', nric.toString());
    localStorage.setItem('thuleen.mfs.resident.publicKey', publicKey);
    localStorage.setItem('thuleen.mfs.resident.seedPhrase', seedPhrase);

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
