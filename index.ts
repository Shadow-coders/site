import Client from './structures/client'
import express from 'express'
import * as fs from 'fs'
import ejs from 'ejs'
import config from './config'
import ModuleHandler from './handlers/modules'
import RouteHandler from './handlers/routes'
//import logger from './logger'
const { debug, error, log, warn } = console
//const   = express
const app = express()
const client = new Client()
client.connect()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.on('mount', () => {
    log('Mounted API!');
})
app.listen(config.port, () => {
    debug('Listening on ' + config.port + `\n ${config.prottocal}${config.domain}${config.usesport ?  ':' +  config.port + '/': '/'} `)
})
ModuleHandler(app)
const Add = async (path:any, prams: any) => {
    const data:any = fs.readFileSync(__dirname +`/views/${path}`).toString()
  //  console.log(data)
    return await ejs.render(data, prams)
}
RouteHandler(app,client,Add) 

// pp.get('/e', (req:any,res:any) => {
//     //res.send()
//     throw new Error('e');
//   })a
  app.use((err: any, req: any,res: any,next:Function) => {
    res.send(`An error!!\n ${err.message}`)
    error(err.message)
// return next(err.message)
return;
})
app.use('*', (req: any,res: any) => {
 //   debug(404)
    res.send('404')
})

//log('read index.js')