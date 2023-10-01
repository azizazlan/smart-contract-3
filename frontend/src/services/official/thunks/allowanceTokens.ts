import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';

import mlkRiceContractJSON from '../../../assets/artifacts/contracts/MelakaRice.sol/MelakaRice.json';
import truncateEthAddr from '../../../utils/truncateEthAddr';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;
const MELAKA_RICE_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RICE;
const ADMIN_PUBLIC_KEY = import.meta.env.VITE_APP_ADMIN_PUBLIC_KEY;

type TokenBalFields = {
  publicKey: string;
};

const allowanceTokens = createAsyncThunk(
  'official_allowance_tokens',
  async (props: TokenBalFields) => {
    const { publicKey } = props;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const melakaRice = new ethers.Contract(
      MELAKA_RICE_CONTRACT_ADDR,
      mlkRiceContractJSON.abi,
      provider
    );

    const bnallowances = await melakaRice.allowance(
      ADMIN_PUBLIC_KEY,
      publicKey
    );
    const allowances = bnallowances.toNumber().toString();

    const message = `Successfully checked allowed melaka rice tokens for ${truncateEthAddr(
      publicKey
    )}`;

    return {
      allowances,
      message,
    };
  }
);
export default allowanceTokens;
