import { createAsyncThunk } from '@reduxjs/toolkit';

const clearLocalSto = createAsyncThunk(
  'resident_clear_localstorage',
  async () => {
    localStorage.removeItem('thuleen.mfs.resident.nric');
    localStorage.removeItem('thuleen.mfs.resident.publicKey');
    localStorage.removeItem('thuleen.mfs.resident.seedPhrase');
    return true;
  }
);
export default clearLocalSto;
