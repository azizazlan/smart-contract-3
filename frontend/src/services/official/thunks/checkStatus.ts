import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;
const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

type CheckStatusFields = {
  checkOfficer: boolean;
  nric: string;
  publicKey: string;
};

const checkStatus = createAsyncThunk(
  'official_check_residency_whitelisting',
  async (props: CheckStatusFields) => {
    const { checkOfficer, nric, publicKey } = props;

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const contract = new ethers.Contract(
      MELAKA_RESIDENT_CONTRACT_ADDR,
      contractABI.abi,
      provider
    );
    const isResident: boolean = await contract.verifyResident(
      publicKey,
      ethers.utils.formatBytes32String(nric)
    );

    const isWhitelisted = await contract.isResidentWhitelisted(publicKey);

    const message = `Successfully checked residency and whitelisting status`;

    return {
      checkOfficer,
      isResident,
      isWhitelisted,
      message,
    };
  }
);
export default checkStatus;
