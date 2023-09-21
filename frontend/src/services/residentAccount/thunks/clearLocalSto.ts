import { createAsyncThunk } from '@reduxjs/toolkit';

const clearLocalSto = createAsyncThunk('clearLocalStorage', async () => {
  localStorage.clear();
  return true;
});
export default clearLocalSto;
