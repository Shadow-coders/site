import express, { Request, Response } from 'express';
const router = express.Router();
router.get('/number', (req:any,res:any) => {
    res.json({
        message: 2
    })
})
router.all('/', (req:any,res:any) => {
res.json({ version: 0x0, /* VERSION NUMBER */ message: '', endpoints: ['GET /test-endpoint', 'POST /endpoint']  })
})
export default router;