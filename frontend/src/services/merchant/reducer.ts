/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import initialize from './thunks/initialize';
import signup from './thunks/signup';

interface MerchantState {
  submissionState: SubmissionStates;
  submissionMsg: string | null;
  publicKey: string | null | undefined;
  seedPhrase: string | null | undefined;
}

const initialState: MerchantState = {
  submissionState: 'IDLE',
  submissionMsg: null,
  publicKey: null,
  seedPhrase: null,
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
  },
});

export const { reset } = merchantSlice.actions;
export default merchantSlice.reducer;