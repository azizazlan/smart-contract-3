import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';

const GOVERNMENT_OFFICER_ROLE: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes('GOVERNMENT_OFFICER_ROLE')
);

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;
const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

type HasRoleFields = {
  publicKey: string;
};

const hasRole = createAsyncThunk(
  'official_check_hasrole',
  async (props: HasRoleFields) => {
    const { publicKey } = props;

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const contract = new ethers.Contract(
      MELAKA_RESIDENT_CONTRACT_ADDR,
      contractABI.abi,
      provider
    );

    const hasRole: boolean = await contract.hasRole(
      GOVERNMENT_OFFICER_ROLE,
      publicKey
    );

    return {
      hasRole,
    };
  }
);
export default hasRole;
