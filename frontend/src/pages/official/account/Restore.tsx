/* eslint-disable no-console */
import { Navigate } from 'react-router-dom';
import RestoreForm from './RestoreForm.tsx';
import { useOfficialSelector } from '../../../services/hook.ts';
import { OfficialState } from '../../../services/store.ts';
import BackdropLoader from '../../../commons/BackdropLoader.tsx';

export default function Restore() {
  const { publicKey, seedPhrase, submissionState } = useOfficialSelector(
    (state: OfficialState) => state.resident
  );

  if (submissionState === 'OK' && publicKey && seedPhrase) {
    window.location.reload();
    return <Navigate to="/official" />;
  }

  return (
    <div>
      <BackdropLoader submissionState={submissionState} />
      <RestoreForm />
    </div>
  );
}
