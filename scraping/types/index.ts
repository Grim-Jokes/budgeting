export type MerchantName = string;
export type MerchantId = number;
export type Amount = number;
export type TransactionDate = Date;

export interface TransactionFromCSV {
  merchant: MerchantName,
  amount: Amount;
  date: TransactionDate;
}

export interface Transaction {
  merchant: MerchantId,
  amount: Amount;
  date: TransactionDate;
}

export type TransactionsFromCSV = TransactionFromCSV[];