import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Wallet } from 'ethers';

import melakaResidentIdJSON from '../../../assets/artifacts/contracts/MelakaResidentId.sol/MelakaResidentId.json';
import truncateEthAddr from '../../../utils/truncateEthAddr';

const MELAKA_RESIDENTID_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RESIDENTID;

type AwardResidentFields = {
  nric: number;
  publicKey: string;
  privateKey: string;
};

const awardResidentId = createAsyncThunk(
  'admin_award_resident_id',
  async (props: AwardResidentFields) => {
    const { publicKey, privateKey, nric } = props;
    const provider = await detectEthereumProvider({ silent: true });
    if (!provider) {
      console.log('Provider is null');
      return;
    }
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const metaMaskWallet = new Wallet(privateKey, web3Provider);

    const melakaResidentId = new ethers.Contract(
      MELAKA_RESIDENTID_ADDR,
      melakaResidentIdJSON.abi,
      web3Provider
    );

    await melakaResidentId
      .connect(metaMaskWallet)
      .mintIdentity(publicKey, nric);

    return {
      // hasIdentity,
      message: `Successfully award Resident ID to public key ${truncateEthAddr(
        publicKey
      )} and NRIC ${nric}. This will take effect in about 15 seconds!`,
    };
  }
);
export default awardResidentId;
