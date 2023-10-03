import { createAsyncThunk } from '@reduxjs/toolkit';
import { BigNumber, ethers } from 'ethers';

import melakaResidentIdJSON from '../../../assets/artifacts/contracts/MelakaResidentId.sol/MelakaResidentId.json';
import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const RESIDENTID_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RESIDENTID;
const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

type VerifyResidentFields = {
  nric: number;
  publicKey: string;
};

const verifyResident = createAsyncThunk(
  'official_verify_resident',
  async (props: VerifyResidentFields) => {
    const { nric, publicKey } = props;

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const melakaResidentId = new ethers.Contract(
      RESIDENTID_CONTRACT_ADDR,
      melakaResidentIdJSON.abi,
      provider
    );
    const melakaSubsidy = new ethers.Contract(
      SUBSIDY_CONTRACT_ADDR,
      melakaSubsidyJSON.abi,
      provider
    );

    const addressNric = await melakaResidentId.nationalIdToAddress(nric);
    console.log(`addressNric: ${addressNric}`);
    console.log(`publicKey  : ${publicKey}`);
    const hasResidentId = addressNric === publicKey;

    const allowanceRiceTokens: BigNumber = await melakaSubsidy.balanceOf(
      publicKey,
      0
    );
    const allowanceWheatFlourTokens: BigNumber = await melakaSubsidy.balanceOf(
      publicKey,
      1
    );

    const balances = [
      allowanceRiceTokens.toNumber(),
      allowanceWheatFlourTokens.toNumber(),
    ];

    const isWhitelisted = await melakaSubsidy.whitelistedNationalIds(nric);

    const message = `Successfully verify resident`;

    return {
      hasResidentId,
      isWhitelisted,
      balances,
      message,
    };
  }
);
export default verifyResident;
