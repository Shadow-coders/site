import express, { Request, Response } from 'express';
import canvas from 'canvas';
import { Canvas } from 'canvas-constructor/cairo'
const router = express.Router();

router.all('/', (req:any,res:any) => {
res.json({ version: 0x0, /* VERSION NUMBER */ message: '', endpoints: ['GET /test-endpoint', 'POST /endpoint']  })
})
router.get('/oogway', async (req, res) => {
if(!req.query.text) return res.status(400).json({ 
    status: 400,
    message: 'Invalid query ?text='
})
    const img = await canvas.loadImage('https://shadow-bot.dev/cdn/files/d4c6a5723891d4fcddca133e0cb1383b.png')
    let image = new Canvas(474,362)
    .printImage(img, 0, 0, 474, 362)
    .setTextFont('40px Impact')
    .printText((req.query.text as string), 210, 220)
    .toBuffer();

    res.set({'Content-Type': 'image/png'})
    res.send(image)
})
export default router;