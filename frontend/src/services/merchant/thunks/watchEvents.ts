import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';
import updateClaims from './updateClaims';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

type WatchTransferEventProps = {
  publicKey: string;
};

const watchEvents = createAsyncThunk(
  'merchant_watch_events',
  async (props: WatchTransferEventProps, thunkAPI: any) => {
    const { publicKey } = props;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const melakaSubsidy = new ethers.Contract(
      SUBSIDY_CONTRACT_ADDR,
      melakaSubsidyJSON.abi,
      provider
    );

    // listen event when subsidy item is claimed
    const eventFilterClaim = melakaSubsidy.filters.ClaimTokensEvent();
    melakaSubsidy.on(
      eventFilterClaim,
      (from, to, tokenId, amount, timestamp, event) => {
        const eventData = {
          from,
          to,
          tokenId,
          amount,
          timestamp,
          event,
        };
        console.log(`to: ${to} publicKey: ${publicKey}`);
        if (to === publicKey) {
          let unixTimestamp = eventData.timestamp;
          unixTimestamp = unixTimestamp.toNumber();
          thunkAPI.dispatch(
            updateClaims({
              blockNumber: event.blockNumber,
              tokenId: tokenId.toNumber(),
              claimantPublicKey: from,
              amount: amount.toNumber(),
              timestamp: unixTimestamp,
            })
          );
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
