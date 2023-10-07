import { TransactionsSubsidy } from '../services/resident/reducer';

export type TokenBalance = {
  tokenId: number;
  balance: number;
};

export function getBalances(transactions: TransactionsSubsidy[]) {
  let balRiceTokens = 0;
  let balFlourTokens = 0;

  transactions.forEach((tx) => {
    if (tx.tokenId === 0 && tx.flow === 1) {
      balRiceTokens += tx.amount;
    }
    if (tx.tokenId === 0 && tx.flow === 0) {
      balRiceTokens -= tx.amount;
    }
    if (tx.tokenId === 1 && tx.flow === 1) {
      balFlourTokens += tx.amount;
    }
    if (tx.tokenId === 1 && tx.flow === 0) {
      balFlourTokens -= tx.amount;
    }
  });

  return [
    { tokenId: 0, balance: balRiceTokens },
    { tokenId: 1, balance: balFlourTokens },
  ];
}
