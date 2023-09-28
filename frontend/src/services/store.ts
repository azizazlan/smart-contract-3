import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import residentReducer from './resident/reducer';
import officialReducer from './official/reducer';
import adminReducer from './admin/reducer';
import appReducer from './app/reducer';

export const store = configureStore({
  reducer: {
    resident: residentReducer,
    official: officialReducer,
    admin: adminReducer,
    app: appReducer,
  },
});

setupListeners(store.dispatch);

export type ResidentState = ReturnType<typeof store.getState>;
export type ResidentDispatch = typeof store.dispatch;

export type OfficialState = ReturnType<typeof store.getState>;
export type OfficialDispatch = typeof store.dispatch;

export type AdminState = ReturnType<typeof store.getState>;
export type AdminDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
