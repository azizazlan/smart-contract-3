import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Wallet } from 'ethers';

import MelakaResidentIdJSON from '../../../assets/artifacts/contracts/MelakaResidentId.sol/MelakaResidentId.json';
const RPC_URL = import.meta.env.VITE_APP_RPC_URL;
const MELAKA_RESIDENTID_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENTID;
const MINTER_ROLE: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes('MINTER_ROLE')
);

type ApplyPrivateKeyFields = {
  privateKey: string;
};

const applyPrivateKey = createAsyncThunk(
  'admin_apply_private_key',
  async (props: ApplyPrivateKeyFields) => {
    const { privateKey } = props;
    const provider = await detectEthereumProvider({ silent: true });
    if (!provider) {
      console.log('Provider is null');
      return;
    }
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const metaMaskWallet = new Wallet(privateKey, web3Provider);

    const publicKey = metaMaskWallet.address;

    const provider2 = new ethers.providers.JsonRpcProvider(RPC_URL);

    const contract = new ethers.Contract(
      MELAKA_RESIDENTID_CONTRACT_ADDR,
      MelakaResidentIdJSON.abi,
      provider2
    );

    const hasMinterRole = await contract.hasRole(MINTER_ROLE, publicKey);

    return {
      hasMinterRole,
      privateKey,
      publicKey,
      message: 'Successfully applied private key',
    };
  }
);
export default applyPrivateKey;
