import express, { Request, Response } from 'express';
import canvas from 'canvas';
import { Canvas } from 'canvas-constructor/cairo'
const router = express.Router();

router.all('/', (req:any,res:any) => {
res.json({ version: 0x0, /* VERSION NUMBER */ message: '', endpoints: ['GET /test-endpoint', 'POST /endpoint']  })
})
router.get('/test', async (req, res) => {
    const img = await canvas.loadImage('https://shadow-bot.dev/cdn/files/d4c6a5723891d4fcddca133e0cb1383b.png')
    let image = new Canvas(474,362)
    .printImage(img, 0, 0, 474, 362)
    .setTextFont('15px Impact')
    .printText('Hello', 211, 50)
    .printText('Sus', 211, 227)
    .toBuffer();

    res.set({'Content-Type': 'image/png'})
    res.send(image)
})
export default router;