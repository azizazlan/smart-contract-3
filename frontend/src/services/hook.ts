import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  OfficialDispatch,
  OfficialState,
  ResidentDispatch,
  ResidentState,
  AdminDispatch,
  AdminState,
  MerchantDispatch,
  MerchantState,
  AppState,
  AppDispatch,
} from './store';

export const useResidentDispatch = () => useDispatch<ResidentDispatch>();
export const useResidentSelector: TypedUseSelectorHook<ResidentState> =
  useSelector;

export const useOfficialDispatch = () => useDispatch<OfficialDispatch>();
export const useOfficialSelector: TypedUseSelectorHook<OfficialState> =
  useSelector;

export const useMerchantDispatch = () => useDispatch<MerchantDispatch>();
export const useMerchantSelector: TypedUseSelectorHook<MerchantState> =
  useSelector;

export const useAdminDispatch = () => useDispatch<AdminDispatch>();
export const useAdminSelector: TypedUseSelectorHook<AdminState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
