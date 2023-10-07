import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

import melakaResidentIdJSON from '../../../assets/artifacts/contracts/MelakaResidentId.sol/MelakaResidentId.json';
import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const RESIDENTID_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RESIDENTID;
const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

type ClaimFields = {
  nric: number;
  publicKey: string;
};

const claim = createAsyncThunk('resident_claim', async (props: ClaimFields) => {
  const { nric, publicKey } = props;

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

  const melakaResidentId = new ethers.Contract(
    RESIDENTID_CONTRACT_ADDR,
    melakaResidentIdJSON.abi,
    provider
  );
  const addressNric = await melakaResidentId.nationalIdToAddress(nric);
  const hasResidentId = addressNric === publicKey;

  const melakaSubsidy = new ethers.Contract(
    SUBSIDY_CONTRACT_ADDR,
    melakaSubsidyJSON.abi,
    provider
  );

  const isWhitelisted = await melakaSubsidy.whitelistedNationalIds(nric);

  const message = `Successfully claimed`;

  return {
    message,
  };
});
export default claim;
