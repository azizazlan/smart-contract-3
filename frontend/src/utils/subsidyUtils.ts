import { TransactionsSubsidy } from '../services/resident/reducer';

export type TokenBalance = {
  tokenId: number;
  balance: number;
};

export function getBalances(transactions: TransactionsSubsidy[]) {
  let balRiceTokens = 0;
  let balFlourTokens = 0;

  transactions.forEach((tx) => {
    if (tx.tokenId === 0) {
      balRiceTokens += tx.receivedTokens;
    }
    if (tx.tokenId === 1) {
      balFlourTokens += tx.receivedTokens;
    }
  });

  return [
    { tokenId: 0, balance: balRiceTokens },
    { tokenId: 1, balance: balFlourTokens },
  ];
}
