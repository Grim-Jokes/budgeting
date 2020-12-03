import { Router } from "express";

import { InsertTransaction, ListTransactions } from "./handlers";


export const router = Router();

router.post('/transactions', InsertTransaction);

router.get('/transactions/:year/', ListTransactions);
router.get('/transactions/:year/:month/', ListTransactions);
router.get('/transactions/:year/:month/:day', ListTransactions);
router.get('/transactions/', ListTransactions);