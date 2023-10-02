/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import metamaskInfo from './thunks/metamaskInfo';
import awardResidentId from './thunks/awardResidentId';
import checkResident from './thunks/checkResidency';
import checkRole from './thunks/checkRole';
import assignRole from './thunks/assignRole';
import contractInfo from './thunks/contractInfo';
import applyPrivateKey from './thunks/applyPrivateKey';
import revokeRole from './thunks/revokeRole';
import checkStatus from './thunks/checkStatus';
import approveAllowance from './thunks/approveAllowance';

interface AdminState {
  submissionState: SubmissionStates;
  submissionMsg: string | null;
  networkId: string;
  etherBal: string;
  riceTokenTotalSupply: string; // MelakaRice (ERC20) token total supply
  riceTokenBal: string; // Admin's balance of MelakaRice (ERC20) token
  publicKey: string | null;
  privateKey: string | null;
  isClaimantHasIdentity: boolean;
  isClaimantOfficer: boolean;
  isClaimantWhitelisted: boolean;
  claimantPublicKey: string | null;
  claimantAllowances: number; // no of allow tokens claimant want to apply
  hasRole: boolean; // has role over the contracts
}

const initialState: AdminState = {
  submissionState: 'IDLE',
  submissionMsg: null,
  networkId: '-1',
  etherBal: '0.0',
  riceTokenBal: '0',
  riceTokenTotalSupply: '0',
  publicKey: null,
  privateKey: null,
  isClaimantHasIdentity: false,
  isClaimantOfficer: false,
  isClaimantWhitelisted: false,
  claimantPublicKey: null,
  claimantAllowances: 0,
  hasRole: false,
};

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
    reset: () => initialState,
    resetSubmission: (state) => {
      state.submissionMsg = null;
      state.isClaimantHasIdentity = false;
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
      console.log(msg);
      msg = msg.substring(0, msg.length / 3);
      state.submissionMsg = msg;
    });
    builder.addCase(contractInfo.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.submissionState = 'FAILED';
        state.submissionMsg = 'Error get contract info';
        return;
      }
      state.hasRole = payload?.isGomenOfficer;
      state.submissionMsg = payload?.message;
      state.riceTokenTotalSupply = payload.riceTokenTotalSupply;
      state.riceTokenBal = payload.riceTokenBal;
      state.submissionState = 'OK';
    });
    builder.addCase(awardResidentId.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(awardResidentId.rejected, (state, action) => {
      state.submissionState = 'FAILED';
      let msg = action.error?.message || 'An error occurred';
      msg = msg.substring(0, msg.length / 3);
      state.submissionMsg = msg;
    });
    builder.addCase(awardResidentId.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.submissionState = 'FAILED';
        state.submissionMsg = 'Error award resident';
        return;
      }
      // state.isClaimantHasIdentity = payload?.hasIdentity;
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
    builder.addCase(checkResident.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(checkResident.fulfilled, (state, { payload }) => {
      state.isClaimantHasIdentity = payload?.isResident;
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
      state.claimantPublicKey = payload.officerPublicKey;
      state.claimantAllowances = payload.allowances;
      state.submissionState = 'OK';
    });
    builder.addCase(approveAllowance.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(approveAllowance.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.submissionMsg = 'Error approving allowance';
        state.submissionState = 'FAILED';
        return;
      }
      state.submissionMsg = payload?.message;
      state.submissionState = 'OK';
    });

    builder.addCase(revokeRole.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(revokeRole.rejected, (state, action) => {
      state.submissionState = 'FAILED';
      let msg = action.error?.message || 'An error occurred';
      msg = msg.substring(0, msg.length / 3);
      state.submissionMsg = msg;
    });
    builder.addCase(revokeRole.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.submissionMsg = 'Payload is null but revoke role failed.';
        state.submissionState = 'FAILED';
        return;
      }
      state.submissionMsg = payload?.message;
      state.submissionState = 'OK';
    });
    builder.addCase(applyPrivateKey.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
      state.publicKey = null;
      state.privateKey = null;
    });
    builder.addCase(applyPrivateKey.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.submissionMsg = null;
        state.publicKey = null;
        state.privateKey = null;
        state.submissionState = 'FAILED';
        return;
      }
      state.submissionState = 'OK';
      state.submissionMsg = payload?.message;
      state.publicKey = payload?.publicKey;
      state.privateKey = payload?.privateKey;
      state.hasRole = payload.hasRole;
    });
    builder.addCase(checkStatus.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
      state.isClaimantHasIdentity = false;
      state.isClaimantOfficer = false;
      state.isClaimantWhitelisted = false;
      state.claimantAllowances = 0;
    });
    builder.addCase(checkStatus.rejected, (state, action) => {
      state.submissionState = 'FAILED';
      console.log(action);
      let msg = action.error?.message || 'An error occurred';
      msg = msg.substring(0, msg.length / 3);
      state.submissionMsg = msg;
    });
    builder.addCase(checkStatus.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.submissionMsg = 'Error message';
        state.submissionState = 'FAILED';
        state.claimantAllowances = 0;
        return;
      }
      state.submissionMsg = payload?.message;
      state.isClaimantHasIdentity = payload.isResident;
      state.isClaimantOfficer = payload.isOfficer;
      state.isClaimantWhitelisted = payload.isWhitelisted;
      state.claimantAllowances = payload.allowances;
      state.submissionState = 'OK';
    });
  },
});

export const { reset, resetSubmission } = adminSlice.actions;
export default adminSlice.reducer;
