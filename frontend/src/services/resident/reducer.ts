/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import signupResident from './thunks/signup';
import initialize from './thunks/initialize';
import clearLocalSto from './thunks/clearLocalSto';
import checkStatus from './thunks/checkStatus';
import restore from './thunks/restore';
import claim from './thunks/claim';
import updateTokens from './thunks/updateTokens';

export interface TransactionsSubsidy {
  flow: 1 | 0; // 1 = incoming and 0 = outgoing
  tokenId: number;
  amount: number;
  timestamp: number;
}

interface ResidentState {
  submissionState: SubmissionStates;
  submissionMsg: string | null;
  networkId: number;
  nric: number;
  publicKey: string | null;
  qrcode: string | null;
  seedPhrase: string | null;
  hasResidentId: boolean;
  isWhitelisted: boolean;
  transactions: TransactionsSubsidy[];
  blockNumber: number;
}

const initialState: ResidentState = {
  submissionState: 'IDLE',
  submissionMsg: null,
  networkId: -1,
  nric: 0,
  publicKey: null,
  qrcode: null,
  seedPhrase: null,
  hasResidentId: false,
  isWhitelisted: false,
  transactions: [],
  blockNumber: 0,
};

export const residentSlice = createSlice({
  name: 'residentSlice',
  initialState,
  reducers: {
    reset: () => initialState,
    resetClaimSubmission: (state) => {
      state.submissionMsg = null;
      state.submissionState = 'IDLE';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initialize.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(initialize.fulfilled, (state, { payload }) => {
      state.nric = payload.nric;
      state.publicKey = payload.publicKey;
      state.qrcode = `${payload.nric}_${payload.publicKey}`;
      state.seedPhrase = payload.seedPhrase;
      state.blockNumber = payload.blockNumber;
      state.transactions = payload.lastTransactions;
      state.submissionState = 'OK';
    });
    builder.addCase(clearLocalSto.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(clearLocalSto.fulfilled, (state, {}) => {
      state.qrcode = null;
      state.nric = 0;
      state.publicKey = null;
      state.seedPhrase = null;
      state.submissionState = 'OK';
    });
    builder.addCase(signupResident.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(signupResident.fulfilled, (state, { payload }) => {
      state.nric = payload.nric;
      state.publicKey = payload.publicKey;
      state.qrcode = `${payload.nric}_${payload.publicKey}`;
      state.seedPhrase = payload.seedPhrase;
      state.submissionState = 'OK';
    });
    builder.addCase(checkStatus.pending, (state, {}) => {
      state.submissionMsg = null;
      state.submissionState = 'PENDING';
    });
    builder.addCase(checkStatus.fulfilled, (state, { payload }) => {
      state.hasResidentId = payload.hasResidentId;
      state.isWhitelisted = payload.isWhitelisted;
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
    builder.addCase(restore.pending, (state, {}) => {
      state.publicKey = null;
      state.seedPhrase = null;
      state.nric = 0;
      state.submissionMsg = null;
      state.submissionState = 'PENDING';
    });
    builder.addCase(restore.fulfilled, (state, { payload }) => {
      state.nric = payload.nric;
      state.publicKey = payload.publicKey;
      state.qrcode = `${payload.nric}_${payload.publicKey}`;
      state.seedPhrase = payload.seedPhrase;
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
    builder.addCase(claim.pending, (state, {}) => {
      state.submissionMsg = null;
      state.submissionState = 'PENDING';
    });
    builder.addCase(claim.rejected, (state, action) => {
      state.submissionMsg = action.error.message || 'Error claim rejected!';
      state.submissionState = 'FAILED';
    });
    builder.addCase(claim.fulfilled, (state, { payload }) => {
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });

    builder.addCase(updateTokens.fulfilled, (state, { payload }) => {
      console.log(`payload.blockNumber=${payload.blockNumber}`);
      if (state.blockNumber !== payload.blockNumber) {
        // Create a new transaction object
        const newTransaction: TransactionsSubsidy = {
          flow: payload.flow, // 1 for incoming
          tokenId: payload.tokenId,
          amount: payload.amount,
          timestamp: payload.timestamp,
        };
        state.transactions.push(newTransaction);

        // last blockNumber
        localStorage.setItem(
          'thuleen.mfs.resident.blockNumber',
          payload.blockNumber.toString()
        );
        localStorage.setItem(
          'thuleen.mfs.resident.transactions',
          JSON.stringify(state.transactions)
        );
        state.blockNumber = payload.blockNumber;
      }
      state.submissionState = 'OK';
    });
  },
});

export const { reset, resetClaimSubmission } = residentSlice.actions;
export default residentSlice.reducer;
