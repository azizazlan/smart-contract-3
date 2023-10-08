import { createAsyncThunk } from '@reduxjs/toolkit';

type UpdateTokensFields = {
  blockNumber: number;
  flow: 0 | 1;
  tokenId: number;
  amount: number;
  timestamp: number;
};

const updateTokens = createAsyncThunk(
  'resident_update_tokens',
  async (props: UpdateTokensFields) => {
    const { blockNumber, flow, tokenId, amount, timestamp } = props;

    // last blockNumber
    localStorage.setItem(
      'thuleen.mfs.resident.blockNumber',
      blockNumber.toString()
    );

    return {
      blockNumber,
      flow,
      tokenId,
      amount,
      timestamp,
    };
  }
);
export default updateTokens;
