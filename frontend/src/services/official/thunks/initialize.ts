import { createAsyncThunk } from '@reduxjs/toolkit';

const initialize = createAsyncThunk('initialize_official', async () => {
  const nric = localStorage.getItem('thuleen.mfs.official.nric');
  const publicKey = localStorage.getItem('thuleen.mfs.official.publicKey');
  const seedPhrase = localStorage.getItem('thuleen.mfs.official.seedPhrase');
  const isResident = !!localStorage.getItem('thuleen.mfs.official.isResident');
  const isOfficer = !!localStorage.getItem('thuleen.mfs.official.isOfficer');

  return {
    nric,
    publicKey,
    seedPhrase,
    isResident,
    isOfficer,
  };
});
export default initialize;
