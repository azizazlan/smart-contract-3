/* eslint-disable no-console */
import { Navigate } from 'react-router-dom';
import RestoreForm from './RestoreForm.tsx';
import { useResidentSelector } from '../../../services/hook.ts';
import { ResidentState } from '../../../services/store.ts';
import BackdropLoader from '../../../commons/BackdropLoader.tsx';

export default function Restore() {
  const { publicKey, seedPhrase, submissionState } = useResidentSelector(
    (state: ResidentState) => state.resident
  );

  if (publicKey && seedPhrase) {
    return <Navigate to="/signedresident" />;
  }

  return (
    <div>
      <BackdropLoader submissionState={submissionState} />
      <RestoreForm />
    </div>
  );
}
