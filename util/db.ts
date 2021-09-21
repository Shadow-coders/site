import { EventEmitter } from 'events'
import config from '../config';
class Mongo extends EventEmitter {
    Model: any
    connection: any
    ping: Number
    logger: any
    debug: Function
    readyAt: any
    uptime: any
public constructor(Model:any) {
super()
this.Model = Model;
this.ping = 0
this.logger = console;
this.debug = function(name:any, data:any) {
this.emit("debug", `[${name || "DB"}] => (${data})`)
}
this.readyAt = Date.now()
this.uptime = Date.now() - this.readyAt
this.on("events.ping", ping => {
this.debug("HeartbeatTimer", "Heartbeat acknowledged, latency of " + ping + "ms.")
})
setInterval(() => this.uptime = Date.now() - this.readyAt, 1)
const ping = async () => {
    this.debug("HeartbeatTimer", "sending a ping")
    let date = Date.now()
    if(!this.set) return;
    await this.set("ping", this.ping ? this.ping : 0)
    await this.delete('ping')
    this.ping = Date.now() - date
    this.emit("events.ping", this.ping)
    if(this.ping > 1000 && this.logger)  this.logger.warn("[DB/PING] the database ping is over 1000!!\n expect low response time ")
    }
    ping()
setInterval(ping, 3e5)
this.emit("ready", this)
}
public set(key:any, value:any): Promise<Object> {

return new Promise(async (res,rej) => {
if(!await this.Model.exists({ key: key, })) {
const data = new this.Model({ key: key, data: value })
data.save()
return res({ key, value })
}
const data = await this.Model.findOneAndUpdate({ key: key }, { data: value })
res({ key, value })
})

}
async get(key:String):Promise<null | any> {

const data:any = await this.Model.findOne({ key: key })
//console.log(data)
if(!data) return null;
 //console.log(data["data"])

return data.data

}
public all(): Promise<Object[]> {
return new Promise(async (res,rej) => {
let data = await this.Model.find()
res(data)
}) 
}
public delete(key:String): Promise<Boolean> {
return new Promise(async (res, rej) => {
const k = await this.Model.findOne({ key: key })
if(!k) return rej(false);
k.remove().catch((e:any) => rej(e))
return res(true);
})
}
/**
 * makeRoutes
 */
public makeRoutes(app:any, db:any, client:any): Promise<any> {
    const auth = (req:any,res:any,next:any) => {
        if(!(req.headers['user-agent'] === 'Site@0.0.1')) return res.status(401);
        next()
    }
return new Promise<any>(async (res:any, rej:any) => {
res()
})
}

}
export default Mongo