import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import mlkResidentContractJSON from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';
import mlkRiceContractJSON from '../../../assets/artifacts/contracts/MelakaRice.sol/MelakaRice.json';
import truncateEthAddr from '../../../utils/truncateEthAddr';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;
const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;
const MELAKA_RICE_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RICE;
// const ADMIN_PUBLIC_KEY = import.meta.env.VITE_APP_ADMIN_PUBLIC_KEY;

type TransferTokensFields = {
  residentNric: string;
  residentPublicKey: string;
};

const transferTokens = createAsyncThunk(
  'official_transfer_tokens',
  async (props: TransferTokensFields) => {
    const { residentNric, residentPublicKey } = props;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const melakaRice = new ethers.Contract(
      MELAKA_RICE_CONTRACT_ADDR,
      mlkRiceContractJSON.abi,
      provider
    );

    // 1. Check if officer have enough allowance tokens

    // const bnallowances = await melakaRice.allowance(
    //   ADMIN_PUBLIC_KEY,
    //   publicKey
    // );
    // const allowances = bnallowances.toNumber().toString();

    // 2. Check is the publicKey (resident) has resident status

    // 3. If all pass, the transfer the tokens - for now we transfer one token

    const message = `Successfully transfer melaka rice tokens to ${truncateEthAddr(
      residentPublicKey
    )}`;

    return {
      message,
    };
  }
);
export default transferTokens;
