import { Request, Response, NextFunction } from 'express';

import { TransactionService } from '@src/app/services/transactions';
import { Merchants } from '@src/infra/repositories/merchants';
import { Transactions } from '@src/infra/repositories/transactions';
import { serializeResponse } from '@src/app/serializers/transaction';
import { Transaction } from '@src/models/entities';

export async function ListTransactions(req: Request, res: Response, next: NextFunction) {
  const service = new TransactionService(
    await Transactions.getRepo(
      await Merchants.getRepo(),
    ),
    await Merchants.getRepo(),
  );

  try {
    const data: Transaction[] = await service.viewTransactions(req);

    res.status(200);
    res.send(
      JSON.stringify(
        data.map(serializeResponse)
      )
    );
    next();
  } catch (err) {
    next(err);
  } finally {
    
  }
}