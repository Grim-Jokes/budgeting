import { TransactionService } from "@src/app/services/transactions";
import { Merchants } from "@src/infra/repositories/merchants";
import { Transactions } from "@src/infra/repositories/transactions";
import { Transaction } from "@src/models/entities";
import { NextFunction, Request, Response } from "express";

export async function InsertTransactions(req: Request, res: Response, next: NextFunction) {
    const service = new TransactionService(
        await Transactions.getRepo(
            await Merchants.getRepo(),
        ),
        await Merchants.getRepo(),
    );

    try {
        const transaction: Transaction = await service.saveTransaction(req);

        res.status(200);
        res.send(
            JSON.stringify({
                merchant: transaction.merchant.name.value,
                amount: transaction.amount.value,
                date: transaction.date.date.toDateString()
            })
        );
        next();
    } catch (err) {
        next(err);
    }

}
