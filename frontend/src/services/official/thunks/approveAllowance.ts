import { createAsyncThunk } from '@reduxjs/toolkit';
import { BigNumber, ethers, Wallet } from 'ethers';

import mlkResidentContractJSON from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';
import mlkRiceContractJSON from '../../../assets/artifacts/contracts/MelakaRice.sol/MelakaRice.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;
const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

const MELAKA_RICE_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RICE;

const PK = import.meta.env.VITE_APP_DEPLOYER_PRIVATEKEY;

type ApproveAllowanceFields = {
  seedPhrase: string;
  allowance: number;
};

const approveAllowance = createAsyncThunk(
  'official_approve_allowance',
  async (props: ApproveAllowanceFields) => {
    const { seedPhrase, allowance } = props;
    const bnAllowance = BigNumber.from(allowance);

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    // Create an owner wallet using the private key and connect it to the provider
    const ownerWallet = new ethers.Wallet(PK, provider);

    // Create an officer wallet using the seed phrase and connect it to the provider
    const officerWallet =
      ethers.Wallet.fromMnemonic(seedPhrase).connect(provider);

    const melakaResident = new ethers.Contract(
      MELAKA_RESIDENT_CONTRACT_ADDR,
      mlkResidentContractJSON.abi,
      ownerWallet
    );

    const melakaRice = new ethers.Contract(
      MELAKA_RICE_CONTRACT_ADDR,
      mlkRiceContractJSON.abi,
      ownerWallet
    );

    const tx3 = await melakaRice
      .connect(ownerWallet)
      .approve(melakaResident.address, bnAllowance);
    await tx3.wait();

    const tx4 = await melakaRice // To add this line in the Officer app
      .connect(ownerWallet)
      .approve(melakaResident.address, bnAllowance);
    await tx4.wait();

    await new Promise((resolve) => setTimeout(resolve, 19000));

    // Transfer token to the new officer
    const txx = await melakaResident
      .connect(ownerWallet)
      .transferFTToOfficer(officerWallet.address, bnAllowance, {
        gasLimit: 500000,
      });
    await txx.wait();

    // const balance = await melakaRice.balanceOf(wallet.address);
    // console.log(balance);

    const message =
      'Successfully approve but the office must accept the approval to complete!';

    return {
      message,
    };
  }
);
export default approveAllowance;
