import { readFileSync } from "fs";
import { TransactionsFromCSV } from "../../types";
import { toTransaction } from "./utils/toTransaction";


export default async function persistTransactions(saveTransactions: (entries: TransactionsFromCSV) => Promise<void>) {
  const transactions = readFileSync("./statement.csv").toString().trim()
    .split('\n').map(toTransaction);

  return saveTransactions(transactions);
}