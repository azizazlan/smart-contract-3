/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import signupOfficial from './thunks/signup';
import initialize from './thunks/initialize';
import checkStatus from './thunks/checkStatus';
import hasRole from './thunks/hasRole';
import ethBal from './thunks/ethBal';
import awardResidency from './thunks/awardResidency';
import addWhitelist from './thunks/addWhitelist';
import revokeResidency from './thunks/revokeResidency';
import removeWhitelist from './thunks/removeWhitelist';
import restore from './thunks/restore';
import clearLocalSto from './thunks/clearLocalSto';
import allowanceTokens from './thunks/allowanceTokens';

interface OfficialState {
  submissionState: SubmissionStates;
  submissionMsg: string | null;
  networkId: number;
  nric: string | null;
  publicKey: string | null;
  seedPhrase: string | null;
  etherBal: string;
  nEtherBal: number;
  isResident: boolean;
  isOfficer: boolean;
  isClaimResident: boolean;
  isClaimWhitelisted: boolean;
  allowTokens: string;
  claimantNric: string;
  claimantPublicKey: string;
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
  isOfficer: false,
  isResident: false,
  isClaimResident: false,
  isClaimWhitelisted: false,
  allowTokens: '0',
  claimantNric: '',
  claimantPublicKey: '',
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
      state.isClaimResident = false;
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
      state.isOfficer = payload.isOfficer;
      state.isResident = payload.isResident;
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
      if (payload.checkOfficer) {
        state.isResident = payload.isResident;
      } else {
        state.isClaimResident = payload.isResident;
        state.isClaimWhitelisted = payload.isWhitelisted;
      }
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
    builder.addCase(hasRole.pending, (state, {}) => {
      state.submissionState = 'PENDING';
    });
    builder.addCase(hasRole.fulfilled, (state, { payload }) => {
      state.isOfficer = payload.hasRole;
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
    builder.addCase(awardResidency.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(awardResidency.rejected, (state, action) => {
      state.submissionState = 'FAILED';
      let msg = action.error?.message || 'An error occurred';
      msg = msg.substring(0, msg.length / 3);
      state.submissionMsg = msg;
    });
    builder.addCase(awardResidency.fulfilled, (state, { payload }) => {
      state.submissionMsg = payload.message;
      state.submissionState = 'OK';
    });
    builder.addCase(revokeResidency.pending, (state, {}) => {
      state.submissionState = 'PENDING';
      state.submissionMsg = null;
    });
    builder.addCase(revokeResidency.rejected, (state, action) => {
      state.submissionState = 'FAILED';
      let msg = action.error?.message || 'An error occurred';
      msg = msg.substring(0, msg.length / 3);
      state.submissionMsg = msg;
    });
    builder.addCase(revokeResidency.fulfilled, (state, { payload }) => {
      state.submissionState = 'OK';
      state.submissionMsg = payload.message;
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
    builder.addCase(allowanceTokens.pending, (state, {}) => {
      state.allowTokens = '...';
      state.submissionMsg = null;
      state.submissionState = 'PENDING';
    });
    builder.addCase(allowanceTokens.fulfilled, (state, { payload }) => {
      state.submissionMsg = payload.message;
      state.allowTokens = payload.allowances;
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
