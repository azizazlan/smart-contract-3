import { Wallet, ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import truncateEthAddr from '../../../utils/truncateEthAddr';
import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

type RemoveWhitelistFields = {
  nric: number;
  publicKey: string;
  officialSeedphrase: string;
};

const removeWhitelist = createAsyncThunk(
  'official_remove_whitelist',
  async (props: RemoveWhitelistFields) => {
    const { nric, publicKey, officialSeedphrase } = props;

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const officerWallet =
      Wallet.fromMnemonic(officialSeedphrase).connect(provider);

    const melakaSubsidy = new ethers.Contract(
      SUBSIDY_CONTRACT_ADDR,
      melakaSubsidyJSON.abi,
      provider
    );

    await melakaSubsidy.connect(officerWallet).setWhitelisted(nric, false);

    const isWhitelisted = await melakaSubsidy.whitelistedNationalIds(nric);

    const message = `Successfully added to whitelist: ${truncateEthAddr(
      publicKey
    )} with NRIC# ${nric}`;

    // throw new Error('Simulated rejection'); // simulate rejected

    return {
      isWhitelisted,
      nric,
      publicKey,
      message,
    };
  }
);
export default removeWhitelist;
