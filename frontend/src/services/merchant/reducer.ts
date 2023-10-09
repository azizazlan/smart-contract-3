/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import initialize from './thunks/initialize';
import signup from './thunks/signup';
import { MerchantTransaction } from '../transactionType';
import updateClaims from './thunks/updateClaims';

interface MerchantState {
  submissionState: SubmissionStates;
  submissionMsg: string | null;
  publicKey: string | null | undefined;
  seedPhrase: string | null | undefined;
  transactions: MerchantTransaction[];
  lastBlockNumber: number;
}

const initialState: MerchantState = {
  submissionState: 'IDLE',
  submissionMsg: null,
  publicKey: null,
  seedPhrase: null,
  transactions: [],
  lastBlockNumber: 0,
};

export const merchantSlice = createSlice({
  name: 'merchantSlice',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(initialize.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(
      initialize.rejected,
      (state, { payload }: { payload: any }) => {
        state.submissionMsg = payload.message;
        state.submissionState = 'FAILED';
      }
    );
    builder.addCase(initialize.fulfilled, (state, { payload }) => {
      state.publicKey = payload.publicKey;
      state.seedPhrase = payload.seedPhrase;
      state.submissionMsg = payload.message;
      state.lastBlockNumber = payload.lastBlockNumber;
      state.transactions = payload.lastTransactions;
      state.submissionState = 'OK';
    });
    builder.addCase(signup.pending, (state, {}) => {
      state.publicKey = null;
      state.seedPhrase = null;
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.publicKey = payload.publicKey;
      state.seedPhrase = payload.seedPhrase;
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
    builder.addCase(updateClaims.fulfilled, (state, { payload }) => {
      // console.log(`payload.blockNumber=${payload.blockNumber}`);
      if (state.lastBlockNumber !== payload.blockNumber) {
        // Create a new transaction object
        const newTransaction: MerchantTransaction = {
          id: payload.blockNumber,
          claimantPublicKey: payload.claimantPublicKey,
          tokenId: payload.tokenId,
          value: payload.amount,
          timestamp: payload.timestamp,
        };
        state.transactions.push(newTransaction);

        // last blockNumber
        localStorage.setItem(
          'thuleen.mfs.merchant.lastBlockNumber',
          payload.blockNumber.toString()
        );
        localStorage.setItem(
          'thuleen.mfs.merchant.transactions',
          JSON.stringify(state.transactions)
        );
        state.lastBlockNumber = payload.blockNumber;
      }
      state.submissionState = 'OK';
    });
  },
});

export const { reset } = merchantSlice.actions;
export default merchantSlice.reducer;
