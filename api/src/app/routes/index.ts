import { Router } from 'express';
import { router as transRouter } from './transactions';
import { router as catRouter } from './categories';

export const router = Router();

router.use(transRouter);
router.use(catRouter);
