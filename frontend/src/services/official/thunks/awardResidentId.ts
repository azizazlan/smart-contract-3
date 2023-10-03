import { Wallet, ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import truncateEthAddr from '../../../utils/truncateEthAddr';
import melakaResidentIdJSON from '../../../assets/artifacts/contracts/MelakaResidentId.sol/MelakaResidentId.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;
const RESIDENTID_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RESIDENTID;

type AwardResidencyIdFields = {
  nric: number;
  publicKey: string;
  officialSeedphrase: string;
};

const awardResidentId = createAsyncThunk(
  'official_award_residentid',
  async (props: AwardResidencyIdFields) => {
    const { nric, publicKey, officialSeedphrase } = props;

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const wallet = Wallet.fromMnemonic(officialSeedphrase).connect(provider);

    const melakaResidentId = new ethers.Contract(
      RESIDENTID_CONTRACT_ADDR,
      melakaResidentIdJSON.abi,
      provider
    );

    await melakaResidentId.connect(wallet).mintIdentity(publicKey, nric);

    const message = `Successfully award residency id to ${truncateEthAddr(
      publicKey
    )} with NRIC# ${nric}. This will take effect in about 15 seconds!`;

    return {
      message,
      nric,
      publicKey,
    };
  }
);
export default awardResidentId;
