import Client from './structures/client'
import Discord from 'discord.js'
import express from 'express'
import * as fs from 'fs'
import ApiApp from './api/index'
import mongoose from 'mongoose'
import ejs from 'ejs'
import config from './config'
import ModuleHandler from './handlers/modules'
import RouteHandler from './handlers/routes'
import passport from 'passport'
import SiteModel from './models/main'
import BotModel from './models/bot'
import PassportHandler from './handlers/passport'
import DB from './util/db'
import logger from './logger'
//const   = express
const Logger = new logger(null);
const { debug,  log } = Logger
const date:any = Date.now()
const app = express()
app.use(express.json())
let db:any ;
let bot_db : any ;
mongoose.connect(config.mongouri).then((c) => {
  log('connected to mongose db')
  debug('Took ' + (Date.now() - date) + 'ms time to load - DB')
  db = new DB(SiteModel) 
  db.logger = Logger
  bot_db = new DB(BotModel)
  bot_db.logger = Logger
  
db.on('debug', debug)
bot_db.on('debug', debug)
db.makeRoutes(app,db,client).then(() => console.log('e'))
})
const auth = (req:any,res:any,next:any) => {
  console.log(req.body)  
  if(!(req.headers['host'] === `${config.domain}${config.usesport ? `:${config.port}` : ''}`)) return res.status(401).send(401);
  next()
}
app.use(express.urlencoded({ extended: true }));
app.use('/api', ApiApp)
app.get('/db/get', auth, (req:any,res:any) => {
  bot_db.get(req.query.key).then((d:any) => {
      res.json({ data: d })
  })
  })
  app.post('/db/set', auth, async (req:any,res:any) => {
 
    bot_db.set(req.body.key, req.body.value).then((d:any) => {
          res.send('200')
      }).catch(res.send)
  })
  
const shadow = new Discord.Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'DIRECT_MESSAGES', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES', 'GUILD_INVITES']})
shadow.login(config.shadow_token)
shadow.on('ready', () => {
  Logger.client = shadow;
  log('Shadow bot connected for [GUILDS]')
  
  debug('Took ' + (Date.now() - date) + 'ms time to load')
  shadow.guilds.cache.forEach((g:any) => g.members.fetch())
  Logger.ready(shadow)
})
const client:any = new Client()
client.connect().then(() => {
  Logger.ready(client)
})
client.shadow = shadow;
client.db = db;
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.on('mount', () => {
    log('Mounted API!');
})
app.listen(config.port, () => {
    debug('Listening on ' + config.port + `\n ${config.prottocal}${config.domain}${config.usesport ?  ':' +  config.port + '/': '/'} `)
Logger.ready(`[${config.domain}](${config.makeURL()})`)
  })
ModuleHandler(app)
PassportHandler(app)
const Add = async (path:any, prams: any) => {
    const data:any = fs.readFileSync(__dirname +`/views/${path}`).toString()
  //  console.log(data)
    return await ejs.render(data, prams)
}
RouteHandler(app,client,Add) 
app.get('/auth/discord', passport.authenticate('discord'));
	app.get('/auth/discord/callback', passport.authenticate('discord', {
		failureRedirect: '/'
	}), function(
		req:any, res:any) {
			res.redirect('/') // Successful auth
		});
// pp.get('/e', (req:any,res:any) => {
//     //res.send()
//     throw new Error('e');
//   })a
  app.use((err: any, req: any,res: any,next:Function) => {
    res.send(`An error!!\n ${err.message}`)
    console.error(err.message)
// return next(err.message)
return;
})
app.use('*', (req: any,res: any) => {
 //   debug(404)
    res.send('404')
})
// setInterval(() => {
//   log('Test')
// },2e3)
//log('read index.js')const TikTokScraper = require('tiktok-scraper');
process.on('unhandledRejection', (err:Error)  => {
console.error(err)
})
process.on('SIGINT', () => {
  Logger.shutdown(client)
  Logger.shutdown(shadow)
  Logger.shutdown(null)
})