import express from 'express'
import config from '../config'
import session from 'express-session'
import Limiter from './structures/limiter';
import LimiterE from 'express-rate-limit'
import { Client } from 'discord.js';
import auth from './structures/auth'
import router from './routes/api';  
const client = new Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'], allowedMentions: { parse: [], repliedUser: true }});
client.on('ready',() => {
console.log('API bot connected')

})
client.login(config.bot.token)
const app = express()
export default app;
app.on('mount', () => {
    console.log('Mounted API!')
})

app.use(session({
    name: 'app.sid',
    secret: /$Neon^fg28gfb#*@gB*@&^(@)#gb*@3g@*3gB@*uVB2893ON@#98&@#GB/.toString().slice(1, 15)
  }));
  app.use( '/v1/', auth )
  app.set('json spaces', 2)
  app.use(Limiter({ client }))
app.use(router)
  app.get('/', (req:any,res:any) => {
    res.json({
     endpoints: [] 
    })
})
app.get('/authinfo', (req:any,res:any) => {
    res.json(res.auth)
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