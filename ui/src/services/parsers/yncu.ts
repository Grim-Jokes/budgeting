import { TransactionParser } from "./parser";

export class YNCUFileClipboardParser extends TransactionParser {

  merchantIndex = 2;
  dateIndex = 1;
  incomeIndex = 5;
  expenseIndex = 4;

  expectedColCount = 7;

  getMerchant(row: string[]) {
    return super.getMerchant(row).replace(/Confirmation #[\d]+/, '').trim();
  }
}