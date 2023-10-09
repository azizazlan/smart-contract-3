import { BigNumber, Wallet, ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';
import {
  BAG_070KG_RICE,
  BAG_001KG_WHEATFLOUR,
  BAG_001KG_COOKINGOIL,
  BAG_001KG_DIESEL,
  BAG_010KG_FERTILIZER,
} from '../../subsidyType';

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
  async (props: ClaimFields, thunkAPI: any) => {
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
      return thunkAPI.rejectWithValue('Claim failed insufficient token');
    }

    const oneToken = BigNumber.from('1');
    await melakaSubsidy
      .connect(residentWallet)
      .claimTokens(residentNric, merchantPublicKey, tokenId, oneToken);

    const rice = await melakaSubsidy.balanceOf(
      residentWallet.address,
      BAG_070KG_RICE
    );
    const wheatFlour = await melakaSubsidy.balanceOf(
      residentWallet.address,
      BAG_001KG_WHEATFLOUR
    );
    const cookingOil = await melakaSubsidy.balanceOf(
      residentWallet.address,
      BAG_001KG_COOKINGOIL
    );
    const diesel = await melakaSubsidy.balanceOf(
      residentWallet.address,
      BAG_001KG_DIESEL
    );
    const fertilizer = await melakaSubsidy.balanceOf(
      residentWallet.address,
      BAG_010KG_FERTILIZER
    );

    const balances = [rice, wheatFlour, cookingOil, diesel, fertilizer];
    const tokensBalances: number[] = balances.map((balance) =>
      balance.toNumber()
    );

    const message = `Successfully claimed`;

    return {
      tokensBalances,
      message,
    };
  }
);
export default claim;
