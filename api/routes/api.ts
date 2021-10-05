import { Router } from 'express';
import BasicRouter from './basic'
import Encode from './encode'
import { Canvas } from 'canvas-constructor/cairo'
import canvas from 'canvas'

const router = Router();
router.use('/basic', BasicRouter);
router.use('/encode/', Encode)
router.get('/', (req:any,res:any) => res.json({ version: 1.00, message: '' }))
router.get('/testimage', async (req,res) => {
    const img = await canvas.loadImage('https://th.bing.com/th/id/OIP.v8mzpYYKhQjNP0NYqp2DDwHaFq?pid=ImgDet&rs=1')
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
