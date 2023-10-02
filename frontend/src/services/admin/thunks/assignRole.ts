import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Wallet } from 'ethers';

import melakaResidentIdJSON from '../../../assets/artifacts/contracts/MelakaResidentId.sol/MelakaResidentId.json';

import truncateEthAddr from '../../../utils/truncateEthAddr';

const MINTER_ROLE: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes('MINTER_ROLE')
);

const RESIDENTID_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RESIDENTID;

type AssignRoleFields = {
  officerPublicKey: string;
  privateKey: string;
};

const assignRole = createAsyncThunk(
  'admin_assign_role',
  async (props: AssignRoleFields) => {
    const { officerPublicKey, privateKey } = props;
    const provider = await detectEthereumProvider({ silent: true });
    if (!provider) {
      console.log('Provider is null');
      return;
    }
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const metaMaskWallet = new Wallet(privateKey, web3Provider);

    const melakaResident = new ethers.Contract(
      RESIDENTID_CONTRACT_ADDR,
      melakaResidentIdJSON.abi,
      web3Provider
    );

    await melakaResident
      .connect(metaMaskWallet)
      .grantRole(MINTER_ROLE, officerPublicKey);

    return {
      officerPublicKey,
      message: `Successfully assigned role as goverment officer to ${truncateEthAddr(
        officerPublicKey
      )}. This will take effect in about 15 seconds!`,
    };
  }
);
export default assignRole;
