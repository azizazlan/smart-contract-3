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
  primary: string;
  secondary: string;
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
  // transactions: [
  //   {
  //     flow: 1,
  //     tokenId: 0,
  //     amount: 1,
  //     primary: '1 token Bag 70kg of rice',
  //     secondary: '06:37:38 05-10-2023',
  //   },
  //   {
  //     flow: 1,
  //     tokenId: 0,
  //     amount: 1,
  //     primary: '1 token Bag 70kg of rice',
  //     secondary: '06:38:38 05-10-2023',
  //   },
  //   {
  //     flow: 0,
  //     tokenId: 0,
  //     amount: 1,
  //     primary: '1 token Bag 70kg of rice',
  //     secondary: '06:38:38 05-10-2023',
  //   },
  //   {
  //     flow: 1,
  //     tokenId: 1,
  //     amount: 1,
  //     primary: '1 token Bag 01kg of wheat flour',
  //     secondary: '06:38:38 05-10-2023',
  //   },
  //   {
  //     flow: 1,
  //     tokenId: 2,
  //     amount: 1,
  //     primary: '1 token Bag 01kg of cooking oil',
  //     secondary: '06:38:38 05-10-2023',
  //   },
  // ],
};

export const residentSlice = createSlice({
  name: 'residentSlice',
  initialState,
  reducers: {
    reset: () => initialState,
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

    builder.addCase(updateTokens.fulfilled, (state, { payload }) => {
      console.log(`payload.blockNumber=${payload.blockNumber}`);
      if (state.blockNumber !== payload.blockNumber) {
        // Create a new transaction object
        const newTransaction: TransactionsSubsidy = {
          flow: payload.flow, // 1 for incoming
          tokenId: payload.tokenId,
          amount: payload.amount,
          primary: payload.primary,
          secondary: payload.secondary,
        };
        state.transactions.push(newTransaction);
        state.blockNumber = payload.blockNumber;
      }
      state.submissionState = 'OK';
    });
  },
});

export const { reset } = residentSlice.actions;
export default residentSlice.reducer;
