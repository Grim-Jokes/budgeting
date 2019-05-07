import { TransactionRepository } from "src/models/repositories";
import { Transaction } from "src/models/entities";

export class Transactions implements TransactionRepository {
    async save(_transction: Transaction): Promise<Transaction> {
        throw new Error("Method not implemented.");
    }

}