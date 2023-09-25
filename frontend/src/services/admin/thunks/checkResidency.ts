import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';

const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

type CheckResidencyFields = {
  nric: string;
  publicKey: string;
};

const checkResidency = createAsyncThunk(
  'adminCheckResidencyStatus',
  async (props: CheckResidencyFields) => {
    const { publicKey, nric } = props;

    await new Promise((resolve) => setTimeout(resolve, 500));

    const provider = await detectEthereumProvider({ silent: true });
    if (!provider) {
      console.log('Provider is null');
      return;
    }
    const web3Provider = new ethers.providers.Web3Provider(provider);

    const contract = new ethers.Contract(
      MELAKA_RESIDENT_CONTRACT_ADDR,
      contractABI.abi,
      web3Provider
    );
    const bytesNric = ethers.utils.formatBytes32String(nric);

    const isResident = await contract.verifyResident(publicKey, bytesNric);
    return {
      isResident,
    };
  }
);
export default checkResidency;
