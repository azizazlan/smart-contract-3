import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { BigNumber, ethers, Wallet } from 'ethers';

import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';
import truncateEthAddr from '../../../utils/truncateEthAddr';

const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

type AssignRoleFields = {
  tokenId: number;
  allowances: number; // For example 100 tokens of Bag70kg of rice
  officerPublicKey: string;
  privateKey: string;
};

// approve allowance per one token id. For example approve allowance 100 tokens of bag 70kg of rice
const approveAllowance = createAsyncThunk(
  'admin_approve_allowance',
  async (props: AssignRoleFields) => {
    const { officerPublicKey, allowances, tokenId, privateKey } = props;
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

    const tokens = BigNumber.from(allowances);
    const metadataBytes = ethers.utils.toUtf8Bytes('metadata');
    await melakaSubsidy
      .connect(metaMaskWallet)
      .approve(officerPublicKey, tokens);

    await new Promise((resolve) => setTimeout(resolve, 20000));

    await melakaSubsidy
      .connect(metaMaskWallet)
      .mint(officerPublicKey, tokenId, tokens, metadataBytes);

    let tokenName = 'Bag 70kg of rice';
    if (tokenId === 1) tokenName = 'Bag 1kg of Whear flour';

    return {
      officerPublicKey,
      message: `Successfully approved allowance to ${truncateEthAddr(
        officerPublicKey
      )} with ${allowances.toString()} ${tokenName} tokens`,
    };
  }
);
export default approveAllowance;
