import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.all('/', (req:any,res:any) => {
//@ts-ignore
let data:any = { version: 1, /* VERSION NUMBER */ message: undefined, endpoints: ['GET /randomquote']  }
data.message = data.endpoints.join('\n')
res.json(data)
})
router.get('/randomquote', async (req:any, res:any) => {
   const getQuote = async (size:number): Promise<void> => {
    const Resp = await fetch("https://animechan.vercel.app/api/quotes")
    let Resp_json:Array<any> = await Resp.json()
    Resp_json = Resp_json.map((q:any) => {
        q.message = `"${q.quote}" - ${q.character} ${q.anime}`
    })
    let result = size == 1 ? Resp_json[0] : { message: Resp_json }
    result.status = 200;
    result.size = req.query.size;
    res.json(result);
   }
   if(req.query.size && req.query.size > 10) return res.status(400).json({
       message: "Must be under 10",
       status: 400
   })

   if(!req.query.size) {
getQuote(1)
   }
})
export default router;