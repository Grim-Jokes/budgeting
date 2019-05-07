import express from 'express';
 
import bodyParser from 'body-parser';

import { router } from './app/routes/transactions';

export var app =  express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/transactions', router);
