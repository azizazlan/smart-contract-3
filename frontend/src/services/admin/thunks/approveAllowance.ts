import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { BigNumber, ethers, Wallet } from 'ethers';

import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';

import truncateEthAddr from '../../../utils/truncateEthAddr';

const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

type AssignRoleFields = {
  allowances: number;
  officerPublicKey: string;
  privateKey: string;
};

const BAG_070KG_RICE = 0;
const BAG_001KG_WHEATFLOUR = 1;

const approveAllowance = createAsyncThunk(
  'admin_approve_allowance',
  async (props: AssignRoleFields) => {
    console.log(SUBSIDY_CONTRACT_ADDR);

    const { officerPublicKey, allowances, privateKey } = props;
    const provider = await detectEthereumProvider({ silent: true });
    if (!provider) {
      console.log('Provider is null');
      return;
    }
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const metaMaskWallet = new Wallet(privateKey, web3Provider);
    const melakaSubsidy = new ethers.Contract(
      SUBSIDY_CONTRACT_ADDR,
      melakaSubsidyJSON.abi,
      web3Provider
    );
    await new Promise((resolve) => setTimeout(resolve, 15000));

    const tokens = BigNumber.from('1000');
    const metadataBytes = ethers.utils.toUtf8Bytes('metadata');
    await melakaSubsidy
      .connect(metaMaskWallet)
      .approve(officerPublicKey, tokens);

    await new Promise((resolve) => setTimeout(resolve, 20000));

    await melakaSubsidy
      .connect(metaMaskWallet)
      .mint(officerPublicKey, BAG_070KG_RICE, tokens, metadataBytes);

    // await melakaSubsidy
    //   .connect(metaMaskWallet)
    //   .mint(officerPublicKey, BAG_001KG_WHEATFLOUR, tokens, metadataBytes);

    return {
      officerPublicKey,
      message: `Successfully approved allowance to ${truncateEthAddr(
        officerPublicKey
      )} with ${allowances.toString()} tokens`,
    };
  }
);
export default approveAllowance;
