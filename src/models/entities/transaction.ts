import { Merchant, Amount, TransactionDate } from "../value-objects";

export interface TransactionParams {
    merchant: Merchant;
    amount: Amount;
    date: TransactionDate;
}

export class Transaction {
    public readonly merchant: Merchant;
    public readonly amount: Amount;
    public readonly date: TransactionDate;

    public constructor(params: TransactionParams) {
        this.merchant = params.merchant;
        this.date = params.date;
        this.amount = params.amount;
    }
}