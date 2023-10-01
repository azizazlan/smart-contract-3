import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Wallet } from 'ethers';

import melakaResidentJSON from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';

import truncateEthAddr from '../../../utils/truncateEthAddr';

const GOVERNMENT_OFFICER_ROLE: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes('GOVERNMENT_OFFICER_ROLE')
);

const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

type AssignRoleFields = {
  officerPublicKey: string;
  privateKey: string;
  allowances: number;
};

const assignRole = createAsyncThunk(
  'admin_assign_role',
  async (props: AssignRoleFields) => {
    const { officerPublicKey, privateKey, allowances } = props;
    const provider = await detectEthereumProvider({ silent: true });
    if (!provider) {
      console.log('Provider is null');
      return;
    }
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const metaMaskWallet = new Wallet(privateKey, web3Provider);

    const melakaResident = new ethers.Contract(
      MELAKA_RESIDENT_CONTRACT_ADDR,
      melakaResidentJSON.abi,
      web3Provider
    );

    await melakaResident
      .connect(metaMaskWallet)
      .grantRole(GOVERNMENT_OFFICER_ROLE, officerPublicKey);

    return {
      officerPublicKey,
      allowances,
      message: `Successfully assigned role as goverment officer to ${truncateEthAddr(
        officerPublicKey
      )}. This will take effect in about 15 seconds!`,
    };
  }
);
export default assignRole;
