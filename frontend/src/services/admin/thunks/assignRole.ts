import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Wallet } from 'ethers';

import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';
import truncateEthAddr from '../../../utils/truncateEthAddr';

const GOVERNMENT_OFFICER_ROLE: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes('GOVERNMENT_OFFICER_ROLE')
);

const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

type AssignRoleFields = {
  publicKey: string;
  privateKey: string;
};

const assignRole = createAsyncThunk(
  'admin_assign_role',
  async (props: AssignRoleFields) => {
    const { publicKey, privateKey } = props;
    const provider = await detectEthereumProvider({ silent: true });
    if (!provider) {
      console.log('Provider is null');
      return;
    }
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const metaMaskWallet = new Wallet(privateKey, web3Provider);

    const contract = new ethers.Contract(
      MELAKA_RESIDENT_CONTRACT_ADDR,
      contractABI.abi,
      web3Provider
    );

    await contract
      .connect(metaMaskWallet)
      .grantRole(GOVERNMENT_OFFICER_ROLE, publicKey);

    return {
      publicKey,
      message: `Successfully assigned role as goverment officer to ${truncateEthAddr(
        publicKey
      )}. This will take effect in about 15 seconds!`,
    };
  }
);
export default assignRole;
