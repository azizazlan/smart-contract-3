import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

import melakaResidentIdJSON from '../../../assets/artifacts/contracts/MelakaResidentId.sol/MelakaResidentId.json';
import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';
import { BAG_070KG_RICE } from '../../subsidyType';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const RESIDENTID_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RESIDENTID;
const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

type CheckStatusFields = {
  nric: number;
  publicKey: string;
};

const checkStatus = createAsyncThunk(
  'resident_check_status',
  async (props: CheckStatusFields) => {
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

    const riceTokens = await melakaSubsidy.balanceOf(publicKey, BAG_070KG_RICE);
    console.log(`riceTokens=${riceTokens}`);

    const message = `Successfully checked residency and whitelisting status`;

    return {
      hasResidentId,
      isWhitelisted,
      message,
    };
  }
);
export default checkStatus;
