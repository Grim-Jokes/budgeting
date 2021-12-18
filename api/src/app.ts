import express, { NextFunction, Request, Response } from 'express';

import bodyParser from 'body-parser';

import { router } from './app/routes';
import { cleanup } from './infra/cleanup';

export var app = express();
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', router);

/**
 * Remove all of the disposables as the requests have finished their tasks.
 */
app.use('*', (_req: Request, _res: Response, next: NextFunction) => {
    cleanup();
    next();
})

function errorHandler(error: any, _req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(error)
    }
    res.status(500)
    res.json({ reason: error.message });
}

app.use(errorHandler);