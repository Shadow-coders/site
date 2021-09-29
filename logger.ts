import { Client, Message, MessageEmbed, WebhookClient } from "discord.js";
import config from "./config";
import fetch from 'node-fetch'
import { inspect } from 'util'
interface LogInterface {
    logs: any
    errors: any
    warn: any
    debug: any
}
class Webhook {
    message: any
url: any
    public constructor(message:any, url: any) {
      //  super({ url })
      this.url = url
    }
    async send(message:any) {
return fetch(this.url, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(message) })
}
}
class Logger {
    /* TYPEDEFS */
channelId: any
config: any
client: any
logs: LogInterface
/* end of TYPEDEFS */

/**
 * @NeonGamerBot-QK
 * @public
 * @constructor
 */
public constructor(client:any) {

    this.logs = { logs: [], debug: ['Logger loaded'], warn: [], errors: [] }
    this.config = config;
this.client = client
setInterval(() => {
   // console.log(this.logs)
    let debugdesc = ( this.logs.debug.join('\n') )
    let logsdesc = ( this.logs.logs.join('\n') )
    let warndesc = this.logs.warn.join('\n')
    // if(!(typeof logsdesc === 'string')) logsdesc = 'None!'
    // if(!(typeof debugdesc === 'string')) debugdesc = 'None!'
    const embeds:Array<MessageEmbed | undefined | Object> = [
        
         logsdesc ? new MessageEmbed().setColor('#00ff00').setTitle('[LOGS]').setDescription('```\n' + logsdesc +'```').setAuthor('site') : { none: true },
         debugdesc ? new MessageEmbed().setColor('WHITE').setDescription('```\n' + debugdesc+ '```').setTitle('[DEBUG]').setAuthor('site')  : { none: true },
         warndesc ? new MessageEmbed().setColor('YELLOW').setDescription('```\n' + warndesc + '```').setTitle('[WARNS]').setAuthor('site')  : { none: true }
            ]
    fetch(`${config.logger.LogsUrl}`,
         {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ embeds: embeds.filter((emb:any) => !emb.none) }) 
        })
        this.logs = { logs: [], errors: [], warn: [], debug: [] }
}, 3000 * 3)
}
sendHook(message:any,url:String) {
    const webhook = new Webhook(null,url)
return webhook.send(message);
}
 log = (message:any) => {
    console.log(message)
 //   console.log(this)
  //  if(!this) return console.log('no this');
 if(!this.logs) return console.log('no this.logs');
if(!this.logs.logs) return console.log('no this.logs.debug');
if(!this.logs.logs.push) return console.log('no this.logs.debug.push');
 this.logs.logs.push(message)
}
error = (message:any) => {
    if(!(typeof message === 'string')) message = inspect(message)
    console.log(message)

    //   console.log(this)
     //  if(!this) return console.log('no this');
    if(!this.logs) return console.log('no this.logs');
   if(!this.logs.logs) return console.log('no this.logs.debug');
   if(!this.logs.logs.push) return console.log('no this.logs.debug.push');
    this.logs.errors.push(message)
}
/**
 * debug
 */
 debug = (message:any) => {
    console.debug(message)
    if(!this) return console.log('no this');
    if(!this.logs) return console.log('no this.logs');
    if(!this.logs.debug) return console.log('no this.ogs.debug');
    if(!this.logs.debug.push) return console.log('no this.logs.debug.push');
    this.logs.debug.push(message)
}
warn = (message:any) => {
    console.warn(message)
    
    if(!this) return console.log('no this');
    if(!this.logs) return console.log('no this.logs');
    if(!this.logs.debug) return console.log('no this.ogs.debug');
    if(!this.logs.debug.push) return console.log('no this.logs.debug.push');
    this.logs.warn.push(message)
}
async ready(client:any) {
if(!(client instanceof Client)) return fetch(`${config.logger.StatusUrl}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ embeds: [{ title: 'Ready', description: `Site is loaded and is ready on ${client}`, color: 0x00ff00 }] }) })
if(!client.isReady()) await this.readyWhen(client)
return fetch(`${config.logger.StatusUrl}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ embeds: [{ title: 'Ready', description: `${client.user.username} is ready on the site!`, author: { name: client.user.tag, iconURL: client.user.displayAvatarURL() }, color: 0x00ff00 }] }) })
}
private readyWhen(client:Client) {
    return new Promise((res,rej) => {
client.on('ready', res)
    })
}
async shutdown(client:any, reason?:any) {
    if(!client) {
       await fetch(`${config.logger.StatusUrl}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ embeds: [{ title: 'Shutting', description: `Site is shutting off\n No reason`, color: 0xff0000 }] }) })
        process.exit()
    }
   await fetch(`${config.logger.StatusUrl}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ embeds: [{ title: 'Shutting', description: `${client.user.username} on Site is shutting off\n No reason`, color: 0xff0000, author: { name: client.user.tag, iconURL: client.user.displayAvatarURL() }}] }) })
  await client.destroy()
}
}
export default Logger;