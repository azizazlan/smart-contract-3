import { Wallet, ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { createAsyncThunk } from '@reduxjs/toolkit';

import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';
import truncateEthAddr from '../../../utils/truncateEthAddr';

const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

type RevokeResidencyFields = {
  nric: string;
  publicKey: string;
  privateKey: string;
};

const revokeResidency = createAsyncThunk(
  'admin_revoke_residency',
  async (props: RevokeResidencyFields) => {
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
      .revokeResidentialStatus(publicKey, bytesNric);

    const message = `Successfully revoke residency status of ${truncateEthAddr(
      publicKey
    )} with NRIC# ${nric}. This will take effect in about 15 seconds!`;

    // throw new Error('Simulated rejection'); // simulate rejected

    return {
      message,
      nric,
      publicKey,
    };
  }
);
export default revokeResidency;
