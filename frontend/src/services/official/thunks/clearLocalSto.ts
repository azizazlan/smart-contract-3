import { createAsyncThunk } from '@reduxjs/toolkit';

const clearLocalSto = createAsyncThunk(
  'official_clear_localstorage',
  async () => {
    localStorage.removeItem('thuleen.mfs.official.nric');
    localStorage.removeItem('thuleen.mfs.official.publicKey');
    localStorage.removeItem('thuleen.mfs.official.seedPhrase');
    const message = 'Successfully clear local storaga for official';
    return {
      message,
    };
  }
);
export default clearLocalSto;
