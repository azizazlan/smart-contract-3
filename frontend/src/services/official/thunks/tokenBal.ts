import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

import mlkRiceContractJSON from '../../../assets/artifacts/contracts/MelakaRice.sol/MelakaRice.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;
const MELAKA_RICE_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RICE;

type TokenBalFields = {
  publicKey: string;
};

const tokenBal = createAsyncThunk(
  'official_token_balance',
  async (props: TokenBalFields) => {
    const { publicKey } = props;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const melakaRice = new ethers.Contract(
      MELAKA_RICE_CONTRACT_ADDR,
      mlkRiceContractJSON.abi,
      provider
    );

    const bnBal = await melakaRice.balanceOf(publicKey);
    const balance = ethers.utils.parseEther(bnBal);

    const message = `Successfully checked melaka rice tokens`;

    return {
      balance,
      message,
    };
  }
);
export default tokenBal;
