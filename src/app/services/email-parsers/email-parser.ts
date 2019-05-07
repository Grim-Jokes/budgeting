import { Transaction } from "src/models/entities/transaction";

export interface EmailParser {
    parseEmailBody(body: string): Transaction;
}