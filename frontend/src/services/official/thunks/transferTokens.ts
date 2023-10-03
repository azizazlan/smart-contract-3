import { BigNumber, ethers, Wallet } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import truncateEthAddr from '../../../utils/truncateEthAddr';
import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

type TransferTokensFields = {
  tokenId: number;
  residentNric: string;
  residentPublicKey: string;
  officialSeedphrase: string;
};

// in this transfer token we will only transfer one (1) token
const transferTokens = createAsyncThunk(
  'official_transfer_tokens',
  async (props: TransferTokensFields, { rejectWithValue }) => {
    const { tokenId, residentNric, residentPublicKey, officialSeedphrase } =
      props;

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const officialWallet =
      Wallet.fromMnemonic(officialSeedphrase).connect(provider);

    // Check is the publicKey (resident) has resident id and whitelisted
    return rejectWithValue(
      `Resident with public key ${truncateEthAddr(
        residentPublicKey
      )} and NRIC ${residentNric} is not whitelisted.`
    );

    // If all pass, the transfer the tokens - for now we transfer one token
    const melakaSubsidy = new ethers.Contract(
      SUBSIDY_CONTRACT_ADDR,
      melakaSubsidyJSON.abi,
      provider
    );
    const oneToken = BigNumber.from('1');
    await melakaSubsidy
      .connect(officialWallet)
      .transferTokens(
        officialWallet.address,
        residentPublicKey,
        tokenId,
        oneToken
      );

    const message = `Successfully transfer tokens to ${truncateEthAddr(
      residentPublicKey
    )}`;

    return {
      message,
    };
  }
);
export default transferTokens;
