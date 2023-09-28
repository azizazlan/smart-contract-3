import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';

const GOVERNMENT_OFFICER_ROLE: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes('GOVERNMENT_OFFICER_ROLE')
);

const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

type CheckRoleFields = {
  publicKey: string;
};

const checkRole = createAsyncThunk(
  'admin_check_role',
  async (props: CheckRoleFields) => {
    const { publicKey } = props;
    const provider = await detectEthereumProvider({ silent: true });
    if (!provider) {
      console.log('Provider is null');
      return;
    }
    const web3Provider = new ethers.providers.Web3Provider(provider);

    const contract = new ethers.Contract(
      MELAKA_RESIDENT_CONTRACT_ADDR,
      contractABI.abi,
      web3Provider
    );
    const isOfficer = await contract.hasRole(
      GOVERNMENT_OFFICER_ROLE,
      publicKey
    );
    return {
      isOfficer,
    };
  }
);
export default checkRole;
