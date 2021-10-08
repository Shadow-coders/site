import express, { Request, Response } from 'express';
const router = express.Router();
router.get('/number', (req:any,res:any) => {
    res.json({
        message: 2
    })
})
router.all('/', (req:any,res:any) => {
res.json({ version: 1.0, endpoints: [
'GET /',
'GET /base64',
'GET /hex'
] 
})
})
router.all('/', (req:Request,res:Response,next:Function) => {
if(req.method.toLowerCase() === 'get') return next()
res.status(405).json({
    message: 'Method not allowed',
    status: 405
})
})
router.get('/base64', (req:Request, res:Response) => {
    if(!req.query.text) return res.status(400).json({
        message: 'Missing Query Text!',
        status: 400
    })
    const result = Buffer.from(req.query.text.toString(), 'base64').toString();
    res.status(200).json({
        message: result,
        length: result.length,
        status: 200,
        text: req.query.text,
        to: 'utf-8',
        from: 'base64',
    })
    })
    router.get('/hex', (req:Request, res:Response) => {
        if(!req.query.text) return res.status(400).json({
            message: 'Missing Query Text!',
            status: 400
        })
        const result = Buffer.from(req.query.text.toString(), 'hex').toString()
        res.status(200).json({
            message: result,
            length: result.length,
            status: 200,
            text: req.query.text,
            to: 'utf-8',
            from: 'hex'
        })
    })
export default router;