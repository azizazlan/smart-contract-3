import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Wallet } from 'ethers';

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

    return {
      privateKey,
      publicKey,
      message: 'Successfully applied private key',
    };
  }
);
export default applyPrivateKey;
