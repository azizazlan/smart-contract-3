import { createAsyncThunk } from '@reduxjs/toolkit';

type UpdateClaimsFields = {
  blockNumber: number;
  claimantPublicKey: string;
  tokenId: number;
  amount: number;
  timestamp: number;
};

const updateClaims = createAsyncThunk(
  'merchant_update_claims',
  async (props: UpdateClaimsFields) => {
    const { blockNumber, claimantPublicKey, tokenId, amount, timestamp } =
      props;

    // last blockNumber
    localStorage.setItem(
      'thuleen.mfs.merchant.lastBlockNumber',
      blockNumber.toString()
    );

    return {
      blockNumber,
      claimantPublicKey,
      tokenId,
      amount,
      timestamp,
    };
  }
);
export default updateClaims;
