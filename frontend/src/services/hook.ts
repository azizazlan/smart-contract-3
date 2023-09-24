import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  OfficialDispatch,
  OfficialState,
  ResidentDispatch,
  ResidentState,
  AdminDispatch,
  AdminState,
} from './store';

export const useResidentDispatch = () => useDispatch<ResidentDispatch>();
export const useResidentSelector: TypedUseSelectorHook<ResidentState> =
  useSelector;

export const useOfficialDispatch = () => useDispatch<OfficialDispatch>();
export const useOfficialSelector: TypedUseSelectorHook<OfficialState> =
  useSelector;

export const useAdminDispatch = () => useDispatch<AdminDispatch>();
export const useAdminSelector: TypedUseSelectorHook<AdminState> = useSelector;
