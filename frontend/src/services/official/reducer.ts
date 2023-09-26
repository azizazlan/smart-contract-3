/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';
import signupOfficial from './thunks/signup';
import initialize from './thunks/initialize';
import checkStatus from './thunks/checkStatus';
import hasRole from './thunks/hasRole';
import ethBal from './thunks/ethBal';

interface OfficialState {
  submissionState: SubmissionStates;
  networkId: number;
  nric: string | null;
  publicKey: string | null;
  seedPhrase: string | null;
  etherBal: string;
  isResident: boolean;
  isOfficer: boolean;
  isClaimResident: boolean;
  isClaimWhitelisted: boolean;
}

const initialState: OfficialState = {
  submissionState: 'IDLE',
  networkId: -1,
  nric: null,
  publicKey: null,
  seedPhrase: null,
  etherBal: '0',
  isOfficer: false,
  isResident: false,
  isClaimResident: false,
  isClaimWhitelisted: false,
};

export const officialSlice = createSlice({
  name: 'officialSlice',
  initialState,
  reducers: {
    reset: () => initialState,
    resetVerifySubmission: (state) => {
      state.isClaimResident = false;
      state.isClaimWhitelisted = false;
      state.submissionState = 'IDLE';
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
    });
    builder.addCase(checkStatus.fulfilled, (state, { payload }) => {
      if (payload.checkOfficer) {
        state.isResident = payload.isResident;
      } else {
        state.isClaimResident = payload.isResident;
        state.isClaimWhitelisted = payload.isWhitelisted;
      }
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
      state.submissionState = 'OK';
    });
  },
});

export const { reset, resetVerifySubmission } = officialSlice.actions;
export default officialSlice.reducer;
