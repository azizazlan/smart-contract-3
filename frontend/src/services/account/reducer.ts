/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import signupResident from './thunks/signupResident';

interface AccountState {
  submissionState: SubmissionStates;
  networkId: number;
  nric: string | null;
  publicKey: string | null;
  seedPhrase: string | null;
}

const initialState: AccountState = {
  submissionState: 'IDLE',
  networkId: -1,
  nric: null,
  publicKey: null,
  seedPhrase: null,
};

export const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(signupResident.pending, (state, { payload }) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(signupResident.fulfilled, (state, { payload }) => {
      state.nric = payload.nric;
      state.publicKey = payload.publicKey;
      state.seedPhrase = payload.seedPhrase;
      state.submissionState = 'OK';
    });
  },
});

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;
