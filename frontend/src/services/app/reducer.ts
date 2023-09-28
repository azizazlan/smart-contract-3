/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import web3Info from './thunks/web3Info';

interface AppState {
  submissionState: SubmissionStates;
  submissionMsg: string | null;
  networkId: string;
}

const initialState: AppState = {
  submissionState: 'IDLE',
  submissionMsg: null,
  networkId: '-1',
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(web3Info.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
      state.networkId = '-1';
    });
    builder.addCase(web3Info.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.submissionState = 'FAILED';
        state.submissionMsg = null;
        state.networkId = '-1';
        return;
      }
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
      state.networkId = payload.networkId;
    });
  },
});

export const { reset } = appSlice.actions;
export default appSlice.reducer;
