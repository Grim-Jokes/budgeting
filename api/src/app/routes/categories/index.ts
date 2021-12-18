import { Router } from 'express';
import { ListCategories } from './handlers/list';

export const router = Router();

router.get('/categories', ListCategories);