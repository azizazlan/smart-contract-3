import { BigNumber, Wallet, ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

type ClaimFields = {
  merchantPublicKey: string;
  residentNric: number;
  tokenId: number;
  seedPhrase: string;
};

const claim = createAsyncThunk(
  'resident_claim',
  async (props: ClaimFields, { rejectWithValue }) => {
    const { merchantPublicKey, residentNric, tokenId, seedPhrase } = props;
    console.log(`Merchant public key=${merchantPublicKey}`);

    // await new Promise((resolve) => setTimeout(resolve, 15000));

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const residentWallet = Wallet.fromMnemonic(seedPhrase).connect(provider);

    const melakaSubsidy = new ethers.Contract(
      SUBSIDY_CONTRACT_ADDR,
      melakaSubsidyJSON.abi,
      provider
    );

    const tokenBal = await melakaSubsidy.balanceOf(
      residentWallet.address,
      tokenId
    );
    console.log(`Resident token balance=${tokenBal}`);

    if (tokenBal < 1) {
      return rejectWithValue('Claim failed insufficient token');
    }

    const oneToken = BigNumber.from('1');
    await melakaSubsidy
      .connect(residentWallet)
      .claimTokens(residentNric, merchantPublicKey, tokenId, oneToken);

    await new Promise((resolve) => setTimeout(resolve, 15000));

    const tokenPostBal = await melakaSubsidy.balanceOf(
      residentWallet.address,
      tokenId
    );
    console.log(`Resident tokenPostBal=${tokenPostBal}`);

    const message = `Successfully claimed`;

    return {
      message,
    };
  }
);
export default claim;
