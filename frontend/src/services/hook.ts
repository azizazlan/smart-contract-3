import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ResidentAccDispatch, ResidentAccState } from './store';

export const useResidentAccDispatch = () => useDispatch<ResidentAccDispatch>();
export const useResidentAccSelector: TypedUseSelectorHook<ResidentAccState> =
  useSelector;
