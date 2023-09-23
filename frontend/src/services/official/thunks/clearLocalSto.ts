import { createAsyncThunk } from '@reduxjs/toolkit';

const clearLocalSto = createAsyncThunk(
  'clearOfficialLocalStorage',
  async () => {
    localStorage.removeItem('thuleen.mfs.official.nric');
    localStorage.removeItem('thuleen.mfs.official.publicKey');
    localStorage.removeItem('thuleen.mfs.official.seedPhrase');
    return true;
  }
);
export default clearLocalSto;
