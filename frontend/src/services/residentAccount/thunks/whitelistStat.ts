import { createAsyncThunk } from '@reduxjs/toolkit';

const whitelistStat = createAsyncThunk('residentWhitelistStatus', async () => {
  console.log('Request resident whitelist status!');
  const whitelistStat = false;

  return { whitelistStat };
});
export default whitelistStat;
