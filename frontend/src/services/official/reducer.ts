/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import signupOfficial from './thunks/signup';
import initialize from './thunks/initialize';
import checkStatus from './thunks/checkStatus';
import ethBal from './thunks/ethBal';
import awardResidentId from './thunks/awardResidentId';
import addWhitelist from './thunks/addWhitelist';
import removeWhitelist from './thunks/removeWhitelist';
import restore from './thunks/restore';
import clearLocalSto from './thunks/clearLocalSto';
import verifyResident from './thunks/verifyResident';

interface OfficialState {
  submissionState: SubmissionStates;
  submissionMsg: string | null;
  networkId: number;
  nric: string | null;
  publicKey: string | null;
  seedPhrase: string | null;
  etherBal: string;
  nEtherBal: number;
  hasResidentId: boolean;
  hasMinterRole: boolean;
  tokenAllowances: number[];
  claimantNric: string;
  claimantPublicKey: string;
  isClaimHasResidentId: boolean;
  isClaimWhitelisted: boolean;
  claimantTokenBals: number[];
}

const initialState: OfficialState = {
  submissionState: 'IDLE',
  submissionMsg: null,
  networkId: -1,
  nric: null,
  publicKey: null,
  seedPhrase: null,
  etherBal: '0.0',
  nEtherBal: 0,
  hasResidentId: false,
  hasMinterRole: false,
  tokenAllowances: [0, 0],
  claimantNric: '',
  claimantPublicKey: '',
  isClaimHasResidentId: false,
  isClaimWhitelisted: false,
  claimantTokenBals: [0, 0],
};

export const officialSlice = createSlice({
  name: 'officialSlice',
  initialState,
  reducers: {
    reset: () => initialState,
    resetSubmissionState: (state) => {
      state.claimantNric = '';
      state.claimantPublicKey = '';
      state.submissionMsg = null;
      state.submissionState = 'IDLE';
    },
    resetVerifySubmission: (state) => {
      state.submissionMsg = null;
      state.isClaimHasResidentId = false;
      state.isClaimWhitelisted = false;
      state.submissionState = 'IDLE';
    },
    resetResidencySubmission: (state) => {
      state.submissionMsg = null;
      state.submissionState = 'IDLE';
    },
    resetWhitelistSubmission: (state) => {
      state.submissionMsg = null;
      state.submissionState = 'IDLE';
    },
    setClaimantNricPublicKey: (state, { payload }) => {
      state.claimantNric = payload.nric;
      state.claimantPublicKey = payload.publicKey;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initialize.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(initialize.fulfilled, (state, { payload }) => {
      state.nric = payload.nric;
      state.publicKey = payload.publicKey;
      state.seedPhrase = payload.seedPhrase;
      state.hasMinterRole = payload.isOfficer;
      state.hasResidentId = payload.isResident;
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
    builder.addCase(checkStatus.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(checkStatus.fulfilled, (state, { payload }) => {
      state.hasResidentId = payload.hasResidentId;
      state.hasMinterRole = payload.hasMinterRole;
      state.tokenAllowances = payload.allowances;
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
    builder.addCase(ethBal.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(ethBal.fulfilled, (state, { payload }) => {
      state.etherBal = payload.ethBal;
      state.nEtherBal = payload.nEthBal;
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
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
    builder.addCase(addWhitelist.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(addWhitelist.rejected, (state, action) => {
      state.submissionState = 'FAILED';
      let msg = action.error?.message || 'An error occurred';
      msg = msg.substring(0, msg.length / 3);
      state.submissionMsg = msg;
    });
    builder.addCase(addWhitelist.fulfilled, (state, { payload }) => {
      state.isClaimWhitelisted = payload.isWhitelisted;
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
    builder.addCase(removeWhitelist.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(removeWhitelist.rejected, (state, action) => {
      state.submissionState = 'FAILED';
      let msg = action.error?.message || 'An error occurred';
      msg = msg.substring(0, msg.length / 3);
      state.submissionMsg = msg;
    });
    builder.addCase(removeWhitelist.fulfilled, (state, { payload }) => {
      state.isClaimWhitelisted = payload.isWhitelisted;
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
    builder.addCase(restore.pending, (state, {}) => {
      state.submissionMsg = null;
      state.publicKey = null;
      state.seedPhrase = null;
      state.submissionState = 'PENDING';
    });
    builder.addCase(restore.fulfilled, (state, { payload }) => {
      state.nric = payload.nric;
      state.publicKey = payload.publicKey;
      state.seedPhrase = payload.seedPhrase;
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
    builder.addCase(clearLocalSto.pending, (state, {}) => {
      state.submissionMsg = null;
      state.submissionState = 'PENDING';
    });
    builder.addCase(clearLocalSto.fulfilled, (state, { payload }) => {
      state.nric = null;
      state.publicKey = null;
      state.seedPhrase = null;
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
    builder.addCase(verifyResident.pending, (state, {}) => {
      state.submissionMsg = null;
      state.submissionState = 'PENDING';
    });
    builder.addCase(verifyResident.fulfilled, (state, { payload }) => {
      state.isClaimHasResidentId = payload.hasResidentId;
      state.isClaimWhitelisted = payload.isWhitelisted;
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
  },
});

export const {
  reset,
  resetSubmissionState,
  resetVerifySubmission,
  resetResidencySubmission,
  resetWhitelistSubmission,
  setClaimantNricPublicKey,
} = officialSlice.actions;
export default officialSlice.reducer;
