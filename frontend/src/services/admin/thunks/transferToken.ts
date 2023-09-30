import { createAsyncThunk } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Wallet, BigNumber } from 'ethers';

import contractABI from '../../../assets/artifacts/contracts/MelakaResident.sol/MelakaResident.json';
import truncateEthAddr from '../../../utils/truncateEthAddr';
import { TodayOutlined } from '@mui/icons-material';

const GOVERNMENT_OFFICER_ROLE: string = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes('GOVERNMENT_OFFICER_ROLE')
);

const MELAKA_RESIDENT_CONTRACT_ADDR = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;

const MELAKA_RICE_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RICE;

type TransferTokenFields = {
  recipientPublicKey: string;
  privateKey: string;
  units: string;
};

const transferToken = createAsyncThunk(
  'admin_transfer_token',
  async (props: TransferTokenFields) => {
    const { recipientPublicKey, privateKey, units } = props;
    const unitsAsBigNumber = BigNumber.from(units);

    const provider = await detectEthereumProvider({ silent: true });
    if (!provider) {
      console.log('Provider is null');
      return;
    }
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const metaMaskWallet = new Wallet(privateKey, web3Provider);

    const contractMlkResident = new ethers.Contract(
      MELAKA_RESIDENT_CONTRACT_ADDR,
      contractABI.abi,
      web3Provider
    );

    await contractMlkResident
      .connect(metaMaskWallet)
      .transferFTToOfficer(recipientPublicKey, unitsAsBigNumber);

    // const contractMlkRice = new ethers.Contract(
    //   MELAKA_RICE_CONTRACT_ADDR,
    //   contractABI.abi,
    //   web3Provider
    // );

    // TODO: Check if the officer is a reseident and assigned as GOVERMENT OFFICER

    // Only then transfer the tokens

    return {
      recipientPublicKey,
      message: `Successfully transfer MelakaRice {units} tokens to ${truncateEthAddr(
        recipientPublicKey
      )}. This will take effect in about 15 seconds!`,
    };
  }
);
export default transferToken;
