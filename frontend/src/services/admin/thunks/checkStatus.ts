import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { BigNumber, ethers } from 'ethers';

import melakaResidentIdJSON from '../../../assets/artifacts/contracts/MelakaResidentId.sol/MelakaResidentId.json';
import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';

const RESIDENTID_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RESIDENTID;
const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

const MINTER_ROLE: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes('MINTER_ROLE')
);

type CheckStatusFields = {
  nric: number;
  publicKey: string;
};

const checkStatus = createAsyncThunk(
  'admin_check_status',
  async (props: CheckStatusFields) => {
    const { nric, publicKey } = props;
    const provider = await detectEthereumProvider({ silent: true });
    if (!provider) {
      console.log('Provider is null');
      return;
    }
    const web3Provider = new ethers.providers.Web3Provider(provider);
    // const metaMaskWallet = new Wallet(privateKey, web3Provider);

    const melakaResidentId = new ethers.Contract(
      RESIDENTID_CONTRACT_ADDR,
      melakaResidentIdJSON.abi,
      web3Provider
    );

    const melakaSubsidy = new ethers.Contract(
      SUBSIDY_CONTRACT_ADDR,
      melakaSubsidyJSON.abi,
      web3Provider
    );

    const isMinterForId = await melakaResidentId.hasRole(
      MINTER_ROLE,
      publicKey
    );
    const isMinterForSubsidy = await melakaSubsidy.hasRole(
      MINTER_ROLE,
      publicKey
    );
    const hasMinterRole = isMinterForId && isMinterForSubsidy;

    const addressNric = await melakaResidentId.nationalIdToAddress(nric);
    const hasResidentId = addressNric === publicKey;

    const allowRiceTokens: BigNumber = await melakaSubsidy.balanceOf(
      publicKey,
      0
    );
    const allowWheatFlourTokens: BigNumber = await melakaSubsidy.balanceOf(
      publicKey,
      1
    );
    const allowCookingOil: BigNumber = await melakaSubsidy.balanceOf(
      publicKey,
      2
    );
    const allowDiesel: BigNumber = await melakaSubsidy.balanceOf(publicKey, 3);
    const allowFertilizer: BigNumber = await melakaSubsidy.balanceOf(
      publicKey,
      4
    );
    const allowances = [
      allowRiceTokens.toNumber(),
      allowWheatFlourTokens.toNumber(),
      allowCookingOil.toNumber(),
      allowDiesel.toNumber(),
      allowFertilizer.toNumber(),
    ];

    const message = 'Successfully check status';

    return {
      hasMinterRole,
      hasResidentId,
      allowances,
      message,
    };
  }
);
export default checkStatus;
