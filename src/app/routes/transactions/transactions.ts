import { Request, Response, NextFunction } from 'express';
import { TransactionService } from 'src/app/services/transactions';
import { Transactions } from 'src/infra/repositories/transactions';
import { PCEmailParser } from 'src/app/services/email-parsers/pc-email-parser';

export async function InsertTransactions(req: Request, _res: Response, _next: NextFunction) {
    /// TODO: CAll service to insert transactions
    const service = new TransactionService(
      new Transactions(),
      new PCEmailParser()
    );

    await service.saveTransaction(req);
    _res.status(200);
}