import { Request } from 'express';

import { Transaction } from "src/models/entities";
import { TransactionRepository } from "src/models/repositories";
import { EmailParser } from "./email-parsers/email-parser";


interface RequestBody {
    body_plain: string;
}

export class TransactionService {
    constructor(
        private transactionRepo: TransactionRepository,
        private parser: EmailParser
    ) {}


    public async saveTransaction(req: Request): Promise<void> {
        const { body_plain } = req.body as RequestBody;

        const transaction: Transaction = this.parser.parseEmailBody(body_plain)
        this.transactionRepo.save(transaction);
    }
}