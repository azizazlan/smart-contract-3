import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import residentAccReducer from './residentAccount/reducer';

export const store = configureStore({
  reducer: {
    residentAcc: residentAccReducer,
  },
});

setupListeners(store.dispatch);

export type ResidentAccState = ReturnType<typeof store.getState>;
export type ResidentAccDispatch = typeof store.dispatch;
