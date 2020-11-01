import { Router } from "express";

import { InsertTransaction, ListTransactions } from "./handlers";


export const router = Router();

router.post('/transactions', InsertTransaction);
router.get('/transactions', ListTransactions);