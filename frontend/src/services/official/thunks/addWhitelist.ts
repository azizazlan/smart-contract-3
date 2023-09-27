import { Wallet, ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';
import truncateEthAddr from '../../../utils/truncateEthAddr';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;
const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

type AddWhitelistFields = {
  nric: string;
  publicKey: string;
  officialSeedphrase: string;
};

const addWhitelist = createAsyncThunk(
  'official_add_whitelist',
  async (props: AddWhitelistFields) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const { nric, publicKey, officialSeedphrase } = props;

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const wallet = Wallet.fromMnemonic(officialSeedphrase).connect(provider);

    const contract = new ethers.Contract(
      MELAKA_RESIDENT_CONTRACT_ADDR,
      contractABI.abi,
      wallet
    );

    const bytesNric = ethers.utils.formatBytes32String(nric);
    await contract.addResidentWhitelist(publicKey, bytesNric);

    const message = `Successfully added to whitelist: ${truncateEthAddr(
      publicKey
    )} with NRIC# ${nric}`;

    // throw new Error('Simulated rejection'); // simulate rejected

    return {
      message,
      nric,
      publicKey,
    };
  }
);
export default addWhitelist;