import { Transaction, Merchant } from "../entities";

export interface TransactionRepository {
    save(transaction: Transaction): Promise<Transaction>;
    update(transaction: Transaction): Promise<Transaction>;
    list(): Promise<Transaction[]>;
}

export interface MerchantsRepository {
    list(): Promise<Merchant[]>;
    get(id: number): Promise<Merchant>;
    getByName(name: string): Promise<Merchant | void>;
    save(merchant: Merchant): Promise<Merchant>;
}

export type Repositories = TransactionRepository | MerchantsRepository;