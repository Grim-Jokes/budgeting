import { Transaction } from "../entities";

export interface TransactionRepository {
    save(transction: Transaction): Promise<Transaction>;
}