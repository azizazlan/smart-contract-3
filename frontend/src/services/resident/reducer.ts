/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import signupResident from './thunks/signup';
import initialize from './thunks/initialize';
import clearLocalSto from './thunks/clearLocalSto';
import checkStatus from './thunks/checkStatus';
import restore from './thunks/restore';
import watchTfrEvents from './thunks/watchTfrEvents.ts';

export interface TransactionsSubsidy {
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
  transactions: [
    {
      primary: 'Test rice',
      secondary: '06:37:38 05-10-2023 from 0x8626…1199',
    },
    {
      primary: 'Test rice 2',
      secondary: '06:38:38 05-10-2023 from 0x8626…1199',
    },
  ],
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
    builder.addCase(watchTfrEvents.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const { reset } = residentSlice.actions;
export default residentSlice.reducer;
