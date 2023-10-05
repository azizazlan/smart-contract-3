import { ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { format } from 'date-fns';
import melakaResidentIdJSON from '../../../assets/artifacts/contracts/MelakaResidentId.sol/MelakaResidentId.json';
import melakaSubsidyJSON from '../../../assets/artifacts/contracts/MelakaSubsidy.sol/MelakaSubsidy.json';
import checkStatus from './checkStatus';
import ethBal from './ethBal';

const RPC_URL = import.meta.env.VITE_APP_RPC_URL;

const SUBSIDY_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;
const RESIDENTID_CONTRACT_ADDR = import.meta.env.VITE_APP_ADDR_MLK_RESIDENTID;

type WatchTransferEventProps = {
  nric: number;
  publicKey: string;
};

const watchTransferEvent = createAsyncThunk(
  'official_watch_transfer_event',
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

    // listen when
    //RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)
    const eventFilterRoleGranted = melakaSubsidy.filters.RoleGranted();
    melakaSubsidy.on(
      eventFilterRoleGranted,
      (operator, from, to, id, value, event) => {
        console.log(
          `operator=${operator}, from=${from} to=${to}, id=${id}, value=${value}, event=${event}`
        );
        if (from === publicKey) {
          thunkAPI.dispatch(checkStatus({ nric, publicKey }));
        }
      }
    );

    const eventFilterRoleGrantedResId = melakaResidentId.filters.RoleGranted();
    melakaResidentId.on(
      eventFilterRoleGrantedResId,
      (operator, from, to, id, value, event) => {
        console.log(
          `operator=${operator}, from=${from} to=${to}, id=${id}, value=${value}, event=${event}`
        );
        if (from === publicKey) {
          thunkAPI.dispatch(checkStatus({ nric, publicKey }));
        }
      }
    );

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

    // when we approve allowance we mint tokens to officer
    // so "mint" actually emits TransferSingle event!
    const eventFilter = melakaSubsidy.filters.TransferSingle();
    melakaSubsidy.on(eventFilter, (operator, from, to, id, value, event) => {
      // Create an object to represent the event data
      const eventData = {
        operator,
        from,
        to,
        id, // token id
        value,
        event,
      };
      if (to === publicKey) {
        console.log(eventData);
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
