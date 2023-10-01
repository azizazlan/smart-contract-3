import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { BigNumber, ethers, Wallet } from 'ethers';

import melakaRiceJSON from '../../../assets/artifacts/contracts/MelakaRice.sol/MelakaRice.json';

import truncateEthAddr from '../../../utils/truncateEthAddr';

const MELAKA_RICE_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RICE;

type AssignRoleFields = {
  allowances: number;
  officerPublicKey: string;
  privateKey: string;
};

const approveAllowance = createAsyncThunk(
  'admin_approve_allowance',
  async (props: AssignRoleFields) => {
    const { officerPublicKey, allowances, privateKey } = props;
    const provider = await detectEthereumProvider({ silent: true });
    if (!provider) {
      console.log('Provider is null');
      return;
    }
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const metaMaskWallet = new Wallet(privateKey, web3Provider);

    const melakaRice = new ethers.Contract(
      MELAKA_RICE_CONTRACT_ADDR,
      melakaRiceJSON.abi,
      web3Provider
    );

    await new Promise((resolve) => setTimeout(resolve, 15000));

    const bnAllowance = BigNumber.from(`${allowances.toString()}`);

    await melakaRice
      .connect(metaMaskWallet)
      .approve(officerPublicKey, bnAllowance);

    const allow = await melakaRice.allowance(
      metaMaskWallet.address,
      officerPublicKey
    );
    console.log(allow);

    return {
      officerPublicKey,
      message: `Successfully approved allowance to ${truncateEthAddr(
        officerPublicKey
      )} with ${allowances.toString()} tokens`,
    };
  }
);
export default approveAllowance;
