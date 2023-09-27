import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Wallet } from 'ethers';

import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';

const GOVERNMENT_OFFICER_ROLE: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes('GOVERNMENT_OFFICER_ROLE')
);

const METAMASK_PRIVATE_KEY = import.meta.env.VITE_APP_METAMASK_PRIVATE_KEY;

const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

const contractInfo = createAsyncThunk('admin_contract_info', async () => {
  const provider = await detectEthereumProvider({ silent: true });
  if (!provider) {
    console.log('Provider is null');
    return;
  }
  const web3Provider = new ethers.providers.Web3Provider(provider);
  const metaMaskWallet = new Wallet(METAMASK_PRIVATE_KEY, web3Provider);

  const contract = new ethers.Contract(
    MELAKA_RESIDENT_CONTRACT_ADDR,
    contractABI.abi,
    web3Provider
  );
  const isGomenOfficer = await contract.hasRole(
    GOVERNMENT_OFFICER_ROLE,
    metaMaskWallet.address
  );

  console.log(`Metamask address ${metaMaskWallet.address}`);
  console.log(isGomenOfficer);

  return {
    isGomenOfficer,
    message: 'Successfully get contract info',
  };
});
export default contractInfo;
