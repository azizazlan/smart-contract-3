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

type RevokeRoleFields = {
  publicKey: string;
  privateKey: string;
};

const revokeRole = createAsyncThunk(
  'admin_revoke_role',
  async (props: RevokeRoleFields) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { publicKey, privateKey } = props;
    console.log(`public  key ${publicKey}`);
    console.log(`private key ${privateKey}`);
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
      .revokeRole(GOVERNMENT_OFFICER_ROLE, publicKey);

    return {
      publicKey,
      message: `Successfully revoke role as goverment officer to ${truncateEthAddr(
        publicKey
      )}`,
    };
  }
);
export default revokeRole;
