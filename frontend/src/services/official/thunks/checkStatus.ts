import { createAsyncThunk } from '@reduxjs/toolkit';
import { BigNumber, ethers } from 'ethers';

import melakaResidentIdJSON from '../../../assets/artifacts/contracts/MelakaResidentId.sol/MelakaResidentId.json';
import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const RESIDENTID_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RESIDENTID;
const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

const MINTER_ROLE: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes('MINTER_ROLE')
);

type CheckStatusFields = {
  nric: number;
  publicKey: string;
};

const checkStatus = createAsyncThunk(
  'official_check_status',
  async (props: CheckStatusFields) => {
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

    const isMinterForId = await melakaResidentId.hasRole(
      MINTER_ROLE,
      publicKey
    );
    const isMinterForSubsidy = await melakaSubsidy.hasRole(
      MINTER_ROLE,
      publicKey
    );
    const hasMinterRole = isMinterForId && isMinterForSubsidy;

    const addressNric = await melakaResidentId.nationalIdToAddress(nric);
    const hasResidentId = addressNric === publicKey;

    const allowRiceTokens: BigNumber = await melakaSubsidy.balanceOf(
      publicKey,
      0
    );
    const allowWheatFlourTokens: BigNumber = await melakaSubsidy.balanceOf(
      publicKey,
      1
    );
    const allowCookingOil: BigNumber = await melakaSubsidy.balanceOf(
      publicKey,
      2
    );
    const allowDiesel: BigNumber = await melakaSubsidy.balanceOf(publicKey, 3);
    const allowFertilizer: BigNumber = await melakaSubsidy.balanceOf(
      publicKey,
      4
    );

    const allowances = [
      allowRiceTokens.toNumber(),
      allowWheatFlourTokens.toNumber(),
      allowCookingOil.toNumber(),
      allowDiesel.toNumber(),
      allowFertilizer.toNumber(),
    ];

    const isWhitelisted = await melakaSubsidy.whitelistedNationalIds(nric);
    console.log(`isWhitelisted : ${isWhitelisted}`);

    const message = `Successfully check status`;

    return {
      hasMinterRole,
      hasResidentId,
      isWhitelisted,
      allowances,
      message,
    };
  }
);
export default checkStatus;
