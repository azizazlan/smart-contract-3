/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import metamaskInfo from './thunks/metamaskInfo';

interface AdminState {
  submissionState: SubmissionStates;
  networkId: string;
  etherBal: string;
  publicKey: string | null;
}

const initialState: AdminState = {
  submissionState: 'IDLE',
  networkId: '-1',
  etherBal: '0',
  publicKey: null,
};

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(metamaskInfo.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(metamaskInfo.fulfilled, (state, { payload }) => {
      state.publicKey = payload.publicKey;
      state.networkId = payload.networkId;
      state.etherBal = payload.etherBal;
      state.submissionState = 'OK';
    });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
