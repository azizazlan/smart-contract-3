/* eslint-disable no-console */
import { Navigate } from 'react-router-dom';
import RestoreForm from './RestoreForm.tsx';
import { useOfficialSelector } from '../../../services/hook.ts';
import { OfficialState } from '../../../services/store.ts';
import BackdropLoader from '../../../commons/BackdropLoader.tsx';

export default function Restore() {
  const { publicKey, submissionState, seedPhrase } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  if (publicKey && seedPhrase) {
    return <Navigate to="/signedofficial" />;
  }

  return (
    <div>
      <BackdropLoader submissionState={submissionState} />
      <RestoreForm />
    </div>
  );
}
