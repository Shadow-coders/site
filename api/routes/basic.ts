import * as express from 'express';
const router = new express.Router();
router.get('/', (req:any, res:any) => {
res.end()
})

export default router;