import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;
const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

type AwardResidencyFields = {
  nric: string;
  publicKey: string;
};

const awardResidency = createAsyncThunk(
  'officialAwardResidency',
  async (props: AwardResidencyFields) => {
    const { nric, publicKey } = props;

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const contract = new ethers.Contract(
      MELAKA_RESIDENT_CONTRACT_ADDR,
      contractABI.abi,
      provider
    );

    const bytesNric = ethers.utils.formatBytes32String(nric);
    await contract.awardResidentialStatus(publicKey, bytesNric);

    return {
      nric,
      publicKey,
    };
  }
);
export default awardResidency;