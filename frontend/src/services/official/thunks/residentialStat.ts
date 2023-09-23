import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;
const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

type ResidentialStatusFields = {
  nric: string;
  publicKey: string;
};

const residentialStatus = createAsyncThunk(
  'residentialStatus',
  async (props: ResidentialStatusFields) => {
    const { nric, publicKey } = props;

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const contract = new ethers.Contract(
      MELAKA_RESIDENT_CONTRACT_ADDR,
      contractABI.abi,
      provider
    );

    console.log(publicKey);
    console.log(nric);
    const cname = await contract.name();
    console.log(cname);
    const csym = await contract.symbol();
    console.log(csym);

    const isResident: boolean = await contract.verifyResident(
      publicKey,
      ethers.utils.formatBytes32String(nric)
    );

    return {
      isResident,
    };
  }
);
export default residentialStatus;