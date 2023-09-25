/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import metamaskInfo from './thunks/metamaskInfo';
import awardResident from './thunks/awardResident';
import checkResident from './thunks/checkResidency';

interface AdminState {
  submissionState: SubmissionStates;
  networkId: string;
  etherBal: string;
  publicKey: string | null;
  isResident: boolean;
}

const initialState: AdminState = {
  submissionState: 'IDLE',
  networkId: '-1',
  etherBal: '0',
  publicKey: null,
  isResident: false,
};

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
    reset: () => initialState,
    resetSubmission: (state) => {
      state.isResident = false;
      state.submissionState = 'IDLE';
    },
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
    builder.addCase(awardResident.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(awardResident.rejected, (state, action) => {
      console.log(action);
      state.submissionState = 'FAILED';
    });
    builder.addCase(awardResident.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isResident = payload?.isResident;
      state.submissionState = 'OK';
    });
    builder.addCase(checkResident.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(checkResident.fulfilled, (state, { payload }) => {
      state.isResident = payload?.isResident;
      state.submissionState = 'OK';
    });
  },
});

export const { reset, resetSubmission } = adminSlice.actions;
export default adminSlice.reducer;
