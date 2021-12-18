import { NextFunction, Request, Response } from "express";
import { CreateTransactionRequest } from "httptypes";

import { serializeResponse } from "@src/app/serializers/transaction";
import { TransactionService } from "@src/app/services/transactions";
import { Merchants } from "@src/infra/repositories/merchants";
import { Transactions } from "@src/infra/repositories/transactions";
import { Transaction } from "@src/models/entities";

interface InsertTransactionRequest extends Request {
    body: CreateTransactionRequest;
}

interface InsertTransactionsRequest extends Request {
    body: CreateTransactionRequest[];
}

export async function InsertTransaction(req: InsertTransactionRequest | InsertTransactionsRequest, res: Response, next: NextFunction) {
    const service = new TransactionService(
        await Transactions.getRepo(
            await Merchants.getRepo(),
        ),
        await Merchants.getRepo(),
    );

    try {
        let result;
        if (Array.isArray(req.body)) {
            let errors = {};
            const transactions: Transaction[] = await service.saveTransactions(req.body, errors);
            result = JSON.stringify({
                transactions: transactions.map(serializeResponse),
                errors
            });

            let indexes = Object.keys(errors); 
            if (indexes.length > 0) {
                if (indexes.length != req.body.length) {
                    res.status(207) // Multistatus
                } else {
                    res.status(400);
                }
            } else {
                res.status(200);
            }
        } else {
            const transaction: Transaction = await service.saveTransaction(req.body);
            result = JSON.stringify(serializeResponse(transaction));
            res.status(200);
        }

        res.send(result);
        next();
    } catch (err) {
        next(err);
    }

}
