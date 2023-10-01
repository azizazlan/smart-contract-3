import styles from './styles';
import InsufficientEthAlert from '../../../commons/InsufficientEthAlert';
import { useOfficialSelector } from '../../../services/hook';
import { OfficialState } from '../../../services/store';
import TransferFTForm from './TransferFTForm';

// Transfer FT page
export default function TransferFT() {
  // const dispatch = useOfficialDispatch();
  const { submissionState, submissionMsg } = useOfficialSelector(
    (state: OfficialState) => state.official
  );

  return <TransferFTForm />;
}
