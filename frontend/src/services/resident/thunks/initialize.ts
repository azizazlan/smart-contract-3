import { createAsyncThunk } from '@reduxjs/toolkit';

const initialize = createAsyncThunk('initialize_resident_account', async () => {
  const nric = localStorage.getItem('thuleen.mfs.resident.nric');
  const publicKey = localStorage.getItem('thuleen.mfs.resident.publicKey');
  const seedPhrase = localStorage.getItem('thuleen.mfs.resident.seedPhrase');

  return {
    nric,
    publicKey,
    seedPhrase,
  };
});
export default initialize;
