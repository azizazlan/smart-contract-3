import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import MelakaResidentIdJSON from '../../../assets/artifacts/contracts/MelakaResidentId.sol/MelakaResidentId.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;
const MELAKA_RESIDENTID_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENTID;
const MINTER_ROLE: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes('MINTER_ROLE')
);

const initialize = createAsyncThunk('admin_initialize', async () => {
  const publicKey = localStorage.getItem('thuleen.mfs.admin.publicKey');
  const privateKey = localStorage.getItem('thuleen.mfs.admin.privateKey');

  const provider2 = new ethers.providers.JsonRpcProvider(RPC_URL);

  const contract = new ethers.Contract(
    MELAKA_RESIDENTID_CONTRACT_ADDR,
    MelakaResidentIdJSON.abi,
    provider2
  );

  const hasMinterRole = await contract.hasRole(MINTER_ROLE, publicKey);

  return {
    hasMinterRole,
    publicKey,
    privateKey,
  };
});
export default initialize;
