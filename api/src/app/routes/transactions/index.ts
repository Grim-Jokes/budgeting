import { Router } from "express";

import { InsertTransactions, ListTransactions } from "./handlers";


export const router = Router();

router.post('/transactions', InsertTransactions);
router.get('/transactions', ListTransactions);