import { Request } from 'express';

import { Transaction, Merchant } from "@src/models/entities";
import { MerchantsRepository, TransactionRepository } from "@src/models/repositories";
import { Amount, MerchantName, TransactionDate } from '@src/models/value-objects';


interface InsertTransactionRequest {
    merchantId?: number;
    merchant?: string;
    amount: string;
    transactionDate: string | number
}

export class TransactionService {
    constructor(
        private transactionRepo: TransactionRepository,
        private merchantRepo: MerchantsRepository,
    ) { }

    public async saveTransaction(req: Request): Promise<Transaction> {
        const { merchantId, merchant: merchantName, amount, transactionDate } = req.body as InsertTransactionRequest;

        let merchant: Merchant | void;
        if (merchantId) {
            merchant = await this.merchantRepo.get(merchantId);
        } else if (merchantName) {
            merchant = await this.merchantRepo.getByName(merchantName);
            if (!merchant) {
                merchant = await this.merchantRepo.save(new Merchant({
                    name: new MerchantName(merchantName)
                }));
            }
        } else {
            throw new Error("Merchant is not set")
        }

        const transaction = new Transaction({
            merchant,
            amount: new Amount(amount),
            date: new TransactionDate(transactionDate)
        })

        return this.transactionRepo.save(transaction);
    }

    public async viewTransactions(_req: Request) {
        return this.transactionRepo.list()
    }
}