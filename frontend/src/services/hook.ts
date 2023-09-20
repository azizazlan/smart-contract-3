import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AccountDispatch, AccountState } from './store';

export const useAccountDispatch = () => useDispatch<AccountDispatch>();
export const useAccountSelector: TypedUseSelectorHook<AccountState> =
  useSelector;
