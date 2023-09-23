import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import residentReducer from './resident/reducer';
import officialReducer from './official/reducer';

export const store = configureStore({
  reducer: {
    resident: residentReducer,
    official: officialReducer,
  },
});

setupListeners(store.dispatch);

export type ResidentState = ReturnType<typeof store.getState>;
export type ResidentDispatch = typeof store.dispatch;

export type OfficialState = ReturnType<typeof store.getState>;
export type OfficialDispatch = typeof store.dispatch;
