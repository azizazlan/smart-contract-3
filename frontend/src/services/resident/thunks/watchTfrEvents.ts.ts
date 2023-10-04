import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { format } from 'date-fns';

import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

type WatchTfrEventsProps = {
  publicKey: string;
};

const watchTfrEvents = createAsyncThunk(
  'resident_watch_transfer_events',
  async (props: WatchTfrEventsProps) => {
    const { publicKey } = props;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const melakaSubsidy = new ethers.Contract(
      SUBSIDY_CONTRACT_ADDR,
      melakaSubsidyJSON.abi,
      provider
    );

    const eventFilter = melakaSubsidy.filters.TransferSubsidyEvent();

    melakaSubsidy.on(
      eventFilter,
      (from, to, tokenId, value, timestamp, event) => {
        // Create an object to represent the event data
        const eventData = {
          from,
          to,
          tokenId,
          value,
          timestamp,
          event,
        };
        if (to === publicKey) {
          let unixTimestamp = eventData.timestamp;
          unixTimestamp = unixTimestamp.toNumber();
          const dateSent = new Date(unixTimestamp);
          // console.log(dateSent)
          // console.log(eventData);
          console.log(format(dateSent, 'hh:mm:ss  dd-MM-yyyy'));
        }
      }
    );

    const message = `Successfully checked residency and whitelisting status`;

    return {
      message,
    };
  }
);
export default watchTfrEvents;
