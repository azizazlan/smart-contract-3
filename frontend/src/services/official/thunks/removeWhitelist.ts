import { Wallet, ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';
import truncateEthAddr from '../../../utils/truncateEthAddr';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;
const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

type RemoveWhitelistFields = {
  nric: string;
  publicKey: string;
  officialSeedphrase: string;
};

const removeWhitelist = createAsyncThunk(
  'official_remove_whitelist',
  async (props: RemoveWhitelistFields) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { nric, publicKey, officialSeedphrase } = props;

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const wallet = Wallet.fromMnemonic(officialSeedphrase).connect(provider);

    const contract = new ethers.Contract(
      MELAKA_RESIDENT_CONTRACT_ADDR,
      contractABI.abi,
      wallet
    );

    const bytesNric = ethers.utils.formatBytes32String(nric);
    await contract.removeResidentWhitelist(publicKey, bytesNric);

    const message = `Successfully remove resident from whitelist: ${truncateEthAddr(
      publicKey
    )} with NRIC# ${nric}`;

    // throw new Error(
    //   'Simulated rejection. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old'
    // ); // simulate rejected

    return {
      message,
      nric,
      publicKey,
    };
  }
);
export default removeWhitelist;
