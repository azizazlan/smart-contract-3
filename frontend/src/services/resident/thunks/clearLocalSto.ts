import { createAsyncThunk } from '@reduxjs/toolkit';

const clearLocalSto = createAsyncThunk(
  'clear_resident_localstorage',
  async () => {
    localStorage.removeItem('thuleen.mfs.resident.nric');
    localStorage.removeItem('thuleen.mfs.resident.publicKey');
    localStorage.removeItem('thuleen.mfs.resident.seedPhrase');
    return true;
  }
);
export default clearLocalSto;
