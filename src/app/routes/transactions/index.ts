import { Router } from "express";
import { InsertTransactions } from "./transactions";

export var router = Router();

router.use('/', InsertTransactions);