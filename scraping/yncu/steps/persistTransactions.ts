import { readFileSync } from "fs";
import { TransactionFromCSV, TransactionsFromCSV } from "../../types";

function getAmount(credit: string | '', debit: string | '') {
  let modifier = 1;
  let amount = 0;

  if (!debit && !credit) {
    throw new Error("Parsing Error: debit and credit unset");
  }

  if (debit) {
    modifier = -1;
    amount = Number.parseFloat(debit);
  } else {
    amount = Number.parseFloat(credit);
  }

  return amount * modifier;
}

function cleanMerchantName(m: string) {
  return m.replace(/"/g, '').trim();
}

function toTransaction(line: string): TransactionFromCSV {
  const [
    ,
    date,
    merchant,
    ,
    debit,
    credit
  ] = line.split(',');


  return {
    date: new Date(date),
    merchant: cleanMerchantName(merchant),
    amount: getAmount(credit, debit)
  }
}

export default async function persistTransactions(saveTransactions: (entries: TransactionsFromCSV) => Promise<void>) {
  const transactions = readFileSync("./statement.csv").toString().trim()
    .split('\n').map(toTransaction);

  return saveTransactions(transactions);
}