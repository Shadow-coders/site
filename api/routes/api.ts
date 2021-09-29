import * as express from 'express';
import BasicRouter from './basic'
const router = new express.Router();
router.use('/basic', BasicRouter);
export default router;
