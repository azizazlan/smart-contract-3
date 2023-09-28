/* eslint-disable no-console */
import { Navigate } from 'react-router-dom';
import RestoreForm from './RestoreForm.tsx';
import { useResidentSelector } from '../../../services/hook.ts';
import { ResidentState } from '../../../services/store.ts';

export default function Restore() {
  const { publicKey, seedPhrase } = useResidentSelector(
    (state: ResidentState) => state.resident
  );

  if (publicKey && seedPhrase) {
    return <Navigate to="/account" />;
  }

  return <RestoreForm />;
}
