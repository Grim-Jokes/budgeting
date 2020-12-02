import { Transaction, Merchant } from "@src/models/entities";
import { MerchantsRepository, TransactionRepository } from "@src/models/repositories";
import { Amount, MerchantName, TransactionDate } from '@src/models/value-objects';
import { CreateTransactionRequest, ListTransactionsQuery } from 'httptypes';

export interface InsertStatus {
    [index: string]: Error
}

export class TransactionService {
    constructor(
        private transactionRepo: TransactionRepository,
        private merchantRepo: MerchantsRepository,
    ) { }

    public async viewTransactions(filterOptions: ListTransactionsQuery) {

        let today = new Date();
        let year = today.getFullYear();
        if (filterOptions.year) {
            year = Number.parseInt(filterOptions.year);
        }

        let month = 1; // Default to januar if month is not set
        if (filterOptions.month) {
            month = Number.parseInt(filterOptions.month);
        }

        let since = true;
        if (filterOptions.since) {
            since = filterOptions.since.toLowerCase() === 'true'
        }

        console.log('Y-M', year, month, since);

        return this.transactionRepo.list({ year, month, since })

    }

    public async saveTransaction(data: CreateTransactionRequest): Promise<Transaction> {
        const merchant: Merchant = await this.handleMerchant(data);

        if (data.amount == null) {
            throw new Error("Amount cannot be undefined");
        }

        if (data.date == null) {
            throw new Error("Transaction date cannot be undefined");
        }

        const transaction = new Transaction({
            merchant,
            amount: new Amount(data.amount),
            date: new TransactionDate(data.date)
        });

        return this.transactionRepo.save(transaction);
    }

    public async saveTransactions(data: CreateTransactionRequest[], insertErrors: InsertStatus): Promise<Transaction[]> {
        let transactions: Transaction[] = [];

        for (let i = 0; i < data.length; i++) {
            try {
                transactions.push(await this.saveTransaction(data[i]));
            } catch (err) {
                insertErrors[i] = err.message
            }
        }

        return transactions;
    }

    private async handleMerchant(body: CreateTransactionRequest) {
        const { merchantId, merchant: merchantName } = body;
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
        }
        else {
            throw new Error("Merchant is not set")
        }
        return merchant;
    }
}