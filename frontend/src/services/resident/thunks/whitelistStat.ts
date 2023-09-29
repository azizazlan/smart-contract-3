import { createAsyncThunk } from '@reduxjs/toolkit';

const whitelistStat = createAsyncThunk(
  'resident_check_whitelist_status',
  async () => {
    console.log('Request resident whitelist status!');
    const whitelistStat = false;

    return { whitelistStat };
  }
);
export default whitelistStat;
