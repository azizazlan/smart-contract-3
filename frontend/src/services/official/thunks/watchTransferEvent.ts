import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { format } from 'date-fns';

import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';
import checkStatus from './checkStatus';
import ethBal from './ethBal';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

type WatchTransferEventProps = {
  nric: number;
  publicKey: string;
};

const watchTransferEvent = createAsyncThunk(
  'resident_watch_transfer_single_event',
  async (props: WatchTransferEventProps, thunkAPI: any) => {
    const { nric, publicKey } = props;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const melakaSubsidy = new ethers.Contract(
      SUBSIDY_CONTRACT_ADDR,
      melakaSubsidyJSON.abi,
      provider
    );

    // when we approve allowance we mint tokens to officer
    // so "mint" actually emits TransferSingle event!
    const eventFilter = melakaSubsidy.filters.TransferSingle();

    melakaSubsidy.on(eventFilter, (operator, from, to, id, value, event) => {
      // Create an object to represent the event data
      const eventData = {
        from,
        to,
        id, // token id
        value,
        event,
      };
      if (to === publicKey) {
        thunkAPI.dispatch(checkStatus({ nric, publicKey }));
        thunkAPI.dispatch(ethBal({ publicKey }));
      }
    });

    const message = `Successfully checked residency and whitelisting status`;

    return {
      message,
    };
  }
);
export default watchTransferEvent;
