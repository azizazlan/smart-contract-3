import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import truncateEthAddr from '../../../utils/truncateEthAddr';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

type TransferTokensFields = {
  tokenId: number;
  residentNric: string;
  residentPublicKey: string;
};

const transferTokens = createAsyncThunk(
  'official_transfer_tokens',
  async (props: TransferTokensFields) => {
    const { tokenId, residentNric, residentPublicKey } = props;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    // 1. Check if officer have enough allowance tokens

    // const bnallowances = await melakaRice.allowance(
    //   ADMIN_PUBLIC_KEY,
    //   publicKey
    // );
    // const allowances = bnallowances.toNumber().toString();

    // 2. Check is the publicKey (resident) has resident status

    // 3. If all pass, the transfer the tokens - for now we transfer one token

    const message = `Successfully transfer tokens to ${truncateEthAddr(
      residentPublicKey
    )}`;

    return {
      message,
    };
  }
);
export default transferTokens;
