import { BigNumber, ethers, Wallet } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import truncateEthAddr from '../../../utils/truncateEthAddr';
import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';
import melakaResidentIdJSON from '../../../assets/artifacts/contracts/MelakaResidentId.sol/MelakaResidentId.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;
const RESIDENTID_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RESIDENTID;

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

    const melakaResidentId = new ethers.Contract(
      RESIDENTID_CONTRACT_ADDR,
      melakaResidentIdJSON.abi,
      provider
    );

    const melakaSubsidy = new ethers.Contract(
      SUBSIDY_CONTRACT_ADDR,
      melakaSubsidyJSON.abi,
      provider
    );

    // Check is the publicKey (resident) has resident id and whitelisted
    const nric = parseInt(residentNric, 10);
    const nricIdPublicKey = await melakaResidentId.nationalIdToAddress(nric);
    const hasResidentId = nricIdPublicKey === residentPublicKey;
    const isWhitelisted = await melakaSubsidy.whitelistedNationalIds(nric);
    console.log(`isWhitelisted : ${isWhitelisted}`);

    if (!hasResidentId || !isWhitelisted) {
      return rejectWithValue(
        `Resident with public key ${truncateEthAddr(
          residentPublicKey
        )} and NRIC ${residentNric} is not whitelisted.`
      );
    }

    // If all pass, the transfer the tokens - for now we transfer one token
    const oneToken = BigNumber.from('1');
    await melakaSubsidy
      .connect(officialWallet)
      .transferSubsidyTokens(
        officialWallet.address,
        residentPublicKey,
        tokenId,
        oneToken
      );

    const bal = await melakaSubsidy.balanceOf(residentPublicKey, tokenId);
    console.log(`Bal=${bal.toNumber()}`);

    const message = `Successfully transfer tokens to ${truncateEthAddr(
      residentPublicKey
    )}`;

    return {
      message,
    };
  }
);
export default transferTokens;
