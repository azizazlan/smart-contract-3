/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import metamaskInfo from './thunks/metamaskInfo';
import awardResident from './thunks/awardResident';
import checkResident from './thunks/checkResidency';
import checkRole from './thunks/checkRole';
import assignRole from './thunks/assignRole';
import contractInfo from './thunks/contractInfo';

interface AdminState {
  submissionState: SubmissionStates;
  submissionMsg: string | null;
  networkId: string;
  etherBal: string;
  publicKey: string | null;
  isClaimantResident: boolean;
  isClaimantOfficer: boolean;
  claimantPublicKey: string | null;
  isGomenOfficer: boolean;
}

const initialState: AdminState = {
  submissionState: 'IDLE',
  submissionMsg: null,
  networkId: '-1',
  etherBal: '0',
  publicKey: null,
  isClaimantResident: false,
  isClaimantOfficer: false,
  claimantPublicKey: null,
  isGomenOfficer: false,
};

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
    reset: () => initialState,
    resetSubmission: (state) => {
      state.submissionMsg = null;
      state.isClaimantResident = false;
      state.claimantPublicKey = null;
      state.submissionState = 'IDLE';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(metamaskInfo.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(metamaskInfo.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.submissionState = 'FAILED';
        state.submissionMsg = null;
        return;
      }
      state.submissionMsg = payload.message;
      state.publicKey = payload.publicKey;
      state.networkId = payload.networkId;
      state.etherBal = payload.etherBal;
      state.submissionState = 'OK';
    });
    builder.addCase(contractInfo.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(contractInfo.rejected, (state, action) => {
      state.submissionState = 'FAILED';
      let msg = action.error?.message || 'An error occurred';
      msg = msg.substring(0, msg.length / 3);
      state.submissionMsg = msg;
    });
    builder.addCase(contractInfo.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.submissionState = 'FAILED';
        state.submissionMsg = 'Error get contract info';
        return;
      }
      state.isGomenOfficer = payload?.isGomenOfficer;
      state.submissionMsg = payload?.message;
      state.submissionState = 'OK';
    });
    builder.addCase(awardResident.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(awardResident.rejected, (state, action) => {
      state.submissionState = 'FAILED';
      let msg = action.error?.message || 'An error occurred';
      msg = msg.substring(0, msg.length / 3);
      state.submissionMsg = msg;
    });
    builder.addCase(awardResident.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.submissionState = 'FAILED';
        state.submissionMsg = 'Error award resident';
        return;
      }
      state.isClaimantResident = payload?.isResident;
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
    builder.addCase(checkResident.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(checkResident.fulfilled, (state, { payload }) => {
      state.isClaimantResident = payload?.isResident;
      state.submissionState = 'OK';
    });
    builder.addCase(checkRole.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(checkRole.rejected, (state, action) => {
      state.submissionState = 'FAILED';
      let msg = action.error?.message || 'An error occurred';
      msg = msg.substring(0, msg.length / 3);
      state.submissionMsg = msg;
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
      state.submissionMsg = null;
    });
    builder.addCase(assignRole.rejected, (state, action) => {
      let msg = action.error?.message || 'An error occurred';
      msg = msg.substring(0, msg.length / 3);
      state.submissionMsg = msg;
      state.claimantPublicKey = null;
      state.submissionState = 'FAILED';
    });
    builder.addCase(assignRole.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.submissionMsg = null;
        state.claimantPublicKey = null;
        state.submissionMsg = null;
        state.submissionState = 'FAILED';
        return;
      }
      state.submissionMsg = payload.message;
      state.claimantPublicKey = payload.publicKey;
      state.submissionState = 'OK';
    });
  },
});

export const { reset, resetSubmission } = adminSlice.actions;
export default adminSlice.reducer;
