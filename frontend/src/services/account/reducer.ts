/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { SubmissionStates } from '../submissionState';

interface AccountState {
  submissionState: SubmissionStates;
  networkId: number;
  productionLatestBlock: number;
  developmentLatestBlock: number;
}

const initialState: AccountState = {
  submissionState: 'IDLE',
  networkId: -1,
  productionLatestBlock: -1,
  developmentLatestBlock: -1,
};

export const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // builder.addCase(getNetworkId.pending, (state, { payload }) => {
    //   state.submissionState = 'PENDING';
    // });
    // builder.addCase(getNetworkId.fulfilled, (state, { payload }) => {
    //   // TODO : Implement error case
    //   state.submissionState = 'OK';
    //   state.networkId = payload;
    // });
  },
});

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;
