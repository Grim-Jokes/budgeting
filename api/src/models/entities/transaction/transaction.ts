import { Amount, TransactionDate } from "../../value-objects";
import { Entity, EntityParams } from "../entity";
import { Merchant } from './merchant';

export interface TransactionParams extends EntityParams {
    merchant: Merchant;
    amount: Amount;
    date: TransactionDate;
}

export class Transaction extends Entity {
    public readonly merchant: Merchant;
    public readonly amount: Amount;
    public readonly date: TransactionDate;

    public constructor(params: TransactionParams) {
        super(params);
        this.merchant = params.merchant;
        this.date = params.date;
        this.amount = params.amount;

    }
}