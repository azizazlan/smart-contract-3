/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import signupOfficial from './thunks/signup';
import initialize from './thunks/initialize';

interface OfficialState {
  submissionState: SubmissionStates;
  networkId: number;
  nric: string | null;
  publicKey: string | null;
  seedPhrase: string | null;
  etherBal: string;
}

const initialState: OfficialState = {
  submissionState: 'IDLE',
  networkId: -1,
  nric: null,
  publicKey: null,
  seedPhrase: null,
  etherBal: '0',
};

export const officialSlice = createSlice({
  name: 'officialSlice',
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
      state.seedPhrase = payload.seedPhrase;
      state.submissionState = 'OK';
    });
    builder.addCase(signupOfficial.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(signupOfficial.fulfilled, (state, { payload }) => {
      state.nric = payload.nric;
      state.publicKey = payload.publicKey;
      state.seedPhrase = payload.seedPhrase;
      state.submissionState = 'OK';
    });
  },
});

export const { reset } = officialSlice.actions;
export default officialSlice.reducer;
