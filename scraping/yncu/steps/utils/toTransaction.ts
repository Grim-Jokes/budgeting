import { TransactionFromCSV } from "../../../types";

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
  return m.replace(/"/g, '')
    .replace(/ +Confirmation #\d+/, '')
    .replace(/ +\d+/, '')
    .replace(/(  +)/g, ' ')
    .trim();
}

export function toTransaction(line: string): TransactionFromCSV {
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