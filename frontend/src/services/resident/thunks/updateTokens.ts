import { createAsyncThunk } from '@reduxjs/toolkit';

type UpdateTokensFields = {
  blockNumber: number;
  flow: 0 | 1;
  tokenId: number;
  amount: number;
  primary: string;
  secondary: string;
};

const updateTokens = createAsyncThunk(
  'resident_update_tokens',
  async (props: UpdateTokensFields) => {
    const { blockNumber, flow, tokenId, amount, primary, secondary } = props;

    //TODO : Save transactions in localStorage thuleen.mfs.resident.transactions

    return {
      blockNumber,
      flow,
      tokenId,
      amount,
      primary,
      secondary,
    };
  }
);
export default updateTokens;
