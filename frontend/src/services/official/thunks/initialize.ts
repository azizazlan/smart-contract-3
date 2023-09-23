import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ethers } from 'ethers';

// import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';

// const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
//   .VITE_APP_ADDR_MLK_RESIDENT;

const initialize = createAsyncThunk('initializeOfficial', async () => {
  // const provider = new ethers.providers.JsonRpcProvider(
  //   'http://localhost:8545'
  // ); // Replace with your Ethereum RPC URL

  // const contract = new ethers.Contract(
  //   MELAKA_RESIDENT_CONTRACT_ADDR,
  //   contractABI.abi,
  //   provider
  // );

  // const name = await contract.name();
  // const symbol = await contract.symbol();
  // console.log(`Contract name ${name} and symbol ${symbol}`);

  const nric = localStorage.getItem('thuleen.mfs.official.nric');
  const publicKey = localStorage.getItem('thuleen.mfs.official.publicKey');
  const seedPhrase = localStorage.getItem('thuleen.mfs.official.seedPhrase');

  return {
    nric,
    publicKey,
    seedPhrase,
  };
});
export default initialize;
