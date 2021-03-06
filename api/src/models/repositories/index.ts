import { IDisposable } from "@src/infra/cleanup";
import { Transaction, Merchant } from "../entities";

export interface FilterTransactionsBy {
    month: number | void,
    year: number;
}

export interface TransactionRepository extends IDisposable {
    save(transaction: Transaction): Promise<Transaction>;
    update(transaction: Transaction): Promise<Transaction>;
    list(FilterBy: FilterTransactionsBy): Promise<Transaction[]>;
}


export interface MerchantsRepository extends IDisposable {
    list(): Promise<Merchant[]>;
    get(id: number): Promise<Merchant>;
    getByName(name: string): Promise<Merchant | void>;
    save(merchant: Merchant): Promise<Merchant>;
}

export type Repositories = TransactionRepository | MerchantsRepository;