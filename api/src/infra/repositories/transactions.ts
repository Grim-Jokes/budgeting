import { PoolClient } from "pg";

import { MerchantsRepository, TransactionRepository, FilterTransactionsBy } from "../../models/repositories";
import { Transaction, Merchant } from "@src/models/entities/transaction";

import { TransactionDate, Amount } from "@src/models/value-objects";

import { Repository } from './repository';

interface TransactionDTO {
    id: number,
    merchantId: number;
    amount: number;
    date: number | string;
}

function mapTransactionEntryToModel(data: TransactionDTO, merchant: Merchant): Transaction {
    return new Transaction({
        id: data.id,
        merchant,
        date: new TransactionDate(data.date),
        amount: new Amount(data.amount),
    });
}

export class Transactions extends Repository<TransactionDTO> implements TransactionRepository {

    private constructor(client: PoolClient, private merchantRepo: MerchantsRepository) {
        super(client);
    }

    async update(_transaction: Transaction): Promise<Transaction> {
        throw new Error("Method not implemented.");
    }

    async save(transaction: Transaction): Promise<Transaction> {
        const returnedId = await super.insertModel(`INSERT INTO transaction(
            "merchantId", amount, date)
            VALUES ($1::integer,$2::decimal,$3::date)
            RETURNING id;`, [
            (transaction.merchant.id as number),
            transaction.amount.value,
            transaction.date.date.toDateString()
        ]);

        const newTransaction = new Transaction({
            merchant: transaction.merchant,
            amount: transaction.amount,
            date: transaction.date,
            id: returnedId
        })

        return newTransaction;
    }

    async list(filterBy: FilterTransactionsBy): Promise<Transaction[]> {

        let dateFormat = 'YYYY';
        let param = `${filterBy.year}`;

        if (filterBy.month) {
            dateFormat += '-MM';
            param += `-${filterBy.month}`;
        }

        if (filterBy.day) {
            dateFormat += '-DD'
            param += `-${filterBy.day}`;
        }

        const listResults = await this.listModels(`SELECT id, "merchantId", amount, date
        FROM 
            public.transaction 
        WHERE
            TO_CHAR(date, '${dateFormat}') = $1::text
            
        ;`, [param]);
        const transformedResults: Transaction[] = [];

        for (let i = 0; i < listResults.rowCount; i++) {
            const r = listResults.rows[i];
            const merchant = await this.merchantRepo.get(r.merchantId);

            transformedResults.push(mapTransactionEntryToModel(r, merchant));
        }

        return transformedResults;
    }
}