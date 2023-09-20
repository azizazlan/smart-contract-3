import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import accRdcr from './account/reducer';

export const store = configureStore({
  reducer: {
    account: accRdcr,
  },
});

setupListeners(store.dispatch);

export type AccountState = ReturnType<typeof store.getState>;
export type AccountDispatch = typeof store.dispatch;
