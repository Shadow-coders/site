import express from 'express'
import config from '../config'
import session from 'express-session'
import Limiter from './structures/limiter';
import LimiterE from 'express-rate-limit'
import { Client } from 'discord.js';
import auth from './structures/auth'
import router from './routes/api';  
import { Canvas } from 'canvas-constructor/cairo'
import canvas from 'canvas'
// import UserEndpoints from './routes/user'
const statusMonitor = require('express-status-monitor')();

canvas.registerFont('api/impact.ttf', { family: 'Impact' });
const client = new Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'], allowedMentions: { parse: [], repliedUser: true }});
client.on('ready',() => {
console.log('API bot connected')

})

client.login(config.bot.token)
const app = express()
export default app;
//app.use(statusMonitor);
app.on('mount', () => {
    console.log('Mounted API!')
})
app.set('domain', 'api.'+config.domain);
app.use(session({
    name: 'Shadow-cookie',
    secret: /$Neon^fg28gfb#*@gB*@&^(@)#gb*@3g@*3gB@*uVB2893ON@#98&@#GB/.toString().slice(1, 15),
    cookie: { sameSite:true, signed:true, secure:false, maxAge: 24 * 60 * 1000 * 60 },
    resave: true,
    saveUninitialized: true,
  }));
  app.use( '/v1/', auth )
  //app.use()
 // app.use('/user/', UserEndpoints) 
  app.set('json spaces', 2)
  app.use(Limiter({ client }))
app.use('/v1/', router)
  app.get('/', (req:any,res:any) => {
    const endpoints = ['v1', 'status', 'user'].map((e:string) => `/${e}`)
    res.json({
     endpoints,
     version: 1,
     dev: true
    })
})
app.get('/authinfo', (req:any,res:any) => {
    res.json(res.auth)
})
app.use('*', (req:any,res:any) => {
  res.json({ status: 404, message: 'Unkowen endpoint', url: req.url })
})
// app.get('/limit', LimiterE({
//     windowMs: 60 * 1000, // 15 minutes
//     max: 1,
//     handler: (req:any,res:any) => {
// res.status(429).send('To many requests!')
//     }
//   }), (req:any,res:any) => {
//       res.send('E')
//   })