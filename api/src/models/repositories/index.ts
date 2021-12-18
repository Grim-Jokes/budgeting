import { IDisposable } from "@src/infra/cleanup";
import { Transaction, Merchant } from "../entities";
import { Category } from "../entities/transaction/category";
import { MerchantName } from "../value-objects";

export interface FilterTransactionsBy {
    year: number;
    month: number | void;
    day: number | void;
}

export interface TransactionRepository extends IDisposable {
    save(transaction: Transaction): Promise<Transaction>;
    update(transaction: Transaction): Promise<Transaction>;
    list(FilterBy: FilterTransactionsBy): Promise<Transaction[]>;
}


export interface MerchantsRepository extends IDisposable {
    list(): Promise<Merchant[]>;
    get(id: number): Promise<Merchant>;
    getByName(name: MerchantName): Promise<Merchant | void>;
    save(merchant: Merchant): Promise<Merchant>;
}

export interface FilterCategoriesBy {
    parentCategory?: Category
}

export interface CategoriesRepository extends IDisposable {
    list(filterBy?: FilterCategoriesBy): Promise<Category[]>;
    get(id: number): Promise<Category>;
    save(category: Category): Promise<Category>
    update(category: Category): Promise<Category>
}

export type Repositories = TransactionRepository | MerchantsRepository;