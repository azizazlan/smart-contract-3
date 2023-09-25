/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import metamaskInfo from './thunks/metamaskInfo';
import awardResident from './thunks/awardResident';
import checkResident from './thunks/checkResidency';
import checkRole from './thunks/checkRole';
import assignRole from './thunks/assignRole';

interface AdminState {
  submissionState: SubmissionStates;
  networkId: string;
  etherBal: string;
  publicKey: string | null;
  isClaimantResident: boolean;
  isClaimantOfficer: boolean;
  claimantPublicKey: string | null;
}

const initialState: AdminState = {
  submissionState: 'IDLE',
  networkId: '-1',
  etherBal: '0',
  publicKey: null,
  isClaimantResident: false,
  isClaimantOfficer: false,
  claimantPublicKey: null,
};

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
    reset: () => initialState,
    resetSubmission: (state) => {
      state.isClaimantResident = false;
      state.claimantPublicKey = null;
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
      state.submissionState = 'FAILED';
    });
    builder.addCase(awardResident.fulfilled, (state, { payload }) => {
      state.isClaimantResident = payload?.isResident;
      state.submissionState = 'OK';
    });
    builder.addCase(checkResident.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(checkResident.fulfilled, (state, { payload }) => {
      state.isClaimantResident = payload?.isResident;
      state.submissionState = 'OK';
    });
    builder.addCase(checkRole.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(checkRole.rejected, (state, {}) => {
      state.submissionState = 'FAILED';
    });
    builder.addCase(checkRole.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.isClaimantOfficer = false;
        return;
      }
      state.isClaimantOfficer = payload.isOfficer;
      state.submissionState = 'OK';
    });
    builder.addCase(assignRole.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(assignRole.rejected, (state, {}) => {
      state.claimantPublicKey = null;
      state.submissionState = 'FAILED';
    });
    builder.addCase(assignRole.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.claimantPublicKey = null;
        state.submissionState = 'FAILED';
        return;
      }
      state.claimantPublicKey = payload.publicKey;
      state.submissionState = 'OK';
    });
  },
});

export const { reset, resetSubmission } = adminSlice.actions;
export default adminSlice.reducer;
