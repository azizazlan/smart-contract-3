import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import melakaResidentIdJSON from '../../../assets/artifacts/contracts/MelakaResidentId.sol/MelakaResidentId.json';
import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';
import checkStatus from './checkStatus';
import updateTokens from './updateTokens';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;
const RESIDENTID_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RESIDENTID;

type WatchTransferEventProps = {
  nric: number;
  publicKey: string;
};

const watchEvents = createAsyncThunk(
  'resident_watch_events',
  async (props: WatchTransferEventProps, thunkAPI: any) => {
    const { nric, publicKey } = props;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const melakaResidentId = new ethers.Contract(
      RESIDENTID_CONTRACT_ADDR,
      melakaResidentIdJSON.abi,
      provider
    );

    const melakaSubsidy = new ethers.Contract(
      SUBSIDY_CONTRACT_ADDR,
      melakaSubsidyJSON.abi,
      provider
    );

    // listen event when subsidy item is received
    const eventFilterReceiveSubsidy =
      melakaSubsidy.filters.TransferSubsidyEvent();
    melakaSubsidy.on(
      eventFilterReceiveSubsidy,
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
          // const dateSent = new Date(unixTimestamp);
          // const formattedDate = format(dateSent, 'hh:mm:ss  dd-MM-yyyy');
          thunkAPI.dispatch(
            updateTokens({
              blockNumber: event.blockNumber,
              flow: 1,
              tokenId: tokenId.toNumber(),
              amount: eventData.value.toNumber(),
              timestamp: unixTimestamp,
            })
          );
        }
      }
    );

    // listen event when subsidy item is received
    const eventFilterWhitelisted = melakaSubsidy.filters.WhitelistingEvent();
    melakaSubsidy.on(eventFilterWhitelisted, (id, status, timestamp, event) => {
      if (id.toNumber() === nric) {
        console.log(
          `id=${id}, status=${status}, timestamp=${timestamp}, event=${event}`
        );
        thunkAPI.dispatch(checkStatus({ nric, publicKey }));
      }
    });

    // listen event when resident id is awarded
    const eventFilterAwardResidentId = melakaResidentId.filters.Transfer();
    melakaResidentId.on(
      eventFilterAwardResidentId,
      (from, to, tokenId, event) => {
        if (to === publicKey) {
          console.log(`from=${from}, tokenId=${tokenId}, event=${event}`);
          thunkAPI.dispatch(checkStatus({ nric, publicKey }));
        }
      }
    );

    const message = `Successfully watch event`;

    return {
      message,
    };
  }
);
export default watchEvents;
