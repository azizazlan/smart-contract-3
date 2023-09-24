/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';

interface AdminState {
  submissionState: SubmissionStates;
  networkId: number;
  etherBal: string;
}

const initialState: AdminState = {
  submissionState: 'IDLE',
  networkId: -1,
  etherBal: '0',
};

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // builder.addCase(initialize.pending, (state, {}) => {
    //   state.submissionState = 'PENDING';
    // });
    // builder.addCase(initialize.fulfilled, (state, { payload }) => {
    //   state.nric = payload.nric;
    //   state.publicKey = payload.publicKey;
    //   state.seedPhrase = payload.seedPhrase;
    //   state.isOfficer = payload.isOfficer;
    //   state.isResident = payload.isResident;
    //   state.submissionState = 'OK';
    // });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
