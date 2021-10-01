import { Router } from 'express';
import BasicRouter from './basic'
const router = Router();
router.use('/basic', BasicRouter);
router.get('/', (req:any,res:any) => res.json({ version: 1.00 }))
export default router;
