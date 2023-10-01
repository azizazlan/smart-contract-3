import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { BigNumber, ethers, Wallet } from 'ethers';

import mlkResidentContractJSON from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';
import mlkRiceContractJSON from '../../../assets/artifacts/contracts/MelakaRice.sol/MelakaRice.json';

const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

const MELAKA_RICE_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RICE;

type ApproveAllowanceFields = {
  seedPhrase: string;
  allowance: number;
  privateKey: string; // owner-admin
};

const approveAllowance = createAsyncThunk(
  'admin_approve_allowance',
  async (props: ApproveAllowanceFields) => {
    const { seedPhrase, allowance, privateKey } = props;
    const bnAllowance = BigNumber.from(allowance);

    const provider = await detectEthereumProvider({ silent: true });
    if (!provider) {
      console.log('Provider is null');
      return;
    }
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const metaMaskWallet = new Wallet(privateKey, web3Provider);

    const melakaResident = new ethers.Contract(
      MELAKA_RESIDENT_CONTRACT_ADDR,
      mlkResidentContractJSON.abi,
      web3Provider
    );

    const melakaRice = new ethers.Contract(
      MELAKA_RICE_CONTRACT_ADDR,
      mlkRiceContractJSON.abi,
      web3Provider
    );

    const tx3 = await melakaRice
      .connect(metaMaskWallet)
      .approve(melakaResident.address, bnAllowance);
    await tx3.wait();

    // const officerWallet = Wallet.fromMnemonic(seedPhrase);
    // console.log(officerWallet.address);

    // const tx4 = await melakaRice // To add this line in the Officer app
    //   .connect(officerWallet)
    //   .approve(melakaResident.address, bnAllowance);
    // await tx4.wait();

    // Transfer token to the new officer
    // const txx = await melakaResident
    //   .connect(metaMaskWallet)
    //   .transferFTToOfficer(officerWallet.address, bnAllowance);
    // await txx.wait();

    // const balance = await melakaRice.balanceOf(officerWallet.address);
    // console.log(balance);

    const message =
      'Successfully approve but the office must accept the approval to complete!';

    return {
      message,
    };
  }
);
export default approveAllowance;
