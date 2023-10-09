export interface TransactionsSubsidy {
  flow: 1 | 0; // 1 = incoming and 0 = outgoing
  tokenId: number;
  amount: number;
  timestamp: number;
}

export interface MerchantTransaction {
  tokenId: number;
  claimantPublicKey: string;
  value: number;
  id: number;
  timestamp: number;
}
