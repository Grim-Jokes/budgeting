import { Request, Response, NextFunction } from 'express';

import { ListTransactionsResponse } from 'httptypes';

import { TransactionService } from '@src/app/services/transactions';
import { Merchants } from '@src/infra/repositories/merchants';
import { Transactions } from '@src/infra/repositories/transactions';
import { Transaction } from '@src/models/entities';

function serializeResponse(transaction: Transaction): ListTransactionsResponse {

  if (!transaction.id) {
    throw new Error("Attempting to serilize an invalid or unsaved transaction");
  }

  return {
    id: transaction.id,
    merchant: transaction.merchant.name.value,
    amount: transaction.amount.value,
    date: transaction.date.date.toDateString()
  }
}

export async function ListTransactions(req: Request, res: Response, next: NextFunction) {
  const service = new TransactionService(
    await Transactions.getRepo(
      await Merchants.getRepo(),
    ),
    await Merchants.getRepo(),
  );

  try {
    const data = await service.viewTransactions(req);

    res.status(200);
    res.send(
      JSON.stringify(
        data.map(serializeResponse)
      )
    );
    next();
  } catch (err) {
    next(err);
  }
}