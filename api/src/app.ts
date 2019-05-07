import express, { NextFunction, Request, Response } from 'express';

import bodyParser from 'body-parser';

import { router } from './app/routes/transactions';

export var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', router);

function errorHandler(error: any, _req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(error)
    }
    res.status(500)
    res.json({ reason: error.message });
}

app.use(errorHandler);