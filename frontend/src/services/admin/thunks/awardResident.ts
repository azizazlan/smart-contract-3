import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Wallet } from 'ethers';

import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';

const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

type AwardResidentFields = {
  nric: string;
  publicKey: string;
  privateKey: string;
};

const awardResident = createAsyncThunk(
  'adminAwardResident',
  async (props: AwardResidentFields) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { publicKey, privateKey, nric } = props;
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
    const bytesNric = ethers.utils.formatBytes32String(nric);

    await contract
      .connect(metaMaskWallet)
      .awardResidentialStatus(publicKey, bytesNric);

    const isResident = await contract.verifyResident(publicKey, bytesNric);

    return {
      isResident,
      message: 'Successfully award resident',
    };
  }
);
export default awardResident;
