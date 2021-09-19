import { Client, MessageEmbed, Intents, Message } from  'discord.js';
import config from '../config'
class SiteBot extends Client {
    /* this[] definitions*/
commands: Map<null, null>
prefix: Array<String>
constructedAt: any
/* constructor */
public constructor() {
 super({ 
        presence: { 
            activities: 
                [
                    { name: `on ${config.makeURL()}`, type: "LISTENING"}, 
                    { name: config.makeURL(), type: 'STREAMING', url: config.makeURL() }
                ],
            afk:true 
        },
        intents: [
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGES
            ],
        allowedMentions: { 
           parse: ['users'], 
           repliedUser: true 
        } 
        })
this.constructedAt = Date.now()
        this.commands = new Map()
        this.prefix = config.prefix
        this.on('ready', this.load)
    }
   public connect(timeout?: any, callback?: Function) {
if(timeout) {
    return new Promise(async (res:Function,rej:Function) => {
setTimeout(async () => {
    try {
    const login =  await this.login(config.bot.token)
    if(callback) callback(login)
    res(login)
    } catch(e) {
        if(callback) callback(e, null)
        rej(e)
    }
}, timeout || 0)
    })
} else {
    return new Promise(async (res:Function,rej:Function) => {
                try {
            const login =  await this.login(config.bot.token)
            if(callback) callback(login)
            res(login)
                    } catch(e) {
                        if(callback) callback(e, null)
                         rej(e)
                    }
            })
    }
}

load() {
    if(!this.isReady()) return;
    console.log('Ready on ' + this.user.tag)
    
  console.debug('Took ' + (Date.now() - this.constructedAt) + ' time to load')
    this.on('messageCreate', (message:Message) => {
        if(message.author.bot) return
        if(!this.prefix.some((prefix:any) => message.content.startsWith(prefix))) return
        
        if(message.channel.id === '765669027552559149') message.reply('I work')
        message.react('🏓')
    })
}
}
export default SiteBot;