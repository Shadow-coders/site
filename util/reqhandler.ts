import {Client} from 'discord.js'
export default function  (req:any,res:any,next:Function,client: Client) {
if(client.user) {
    if(!req.session) req.session = { requests: 0 }
    if(!req.session.requests) req.session.requests = 0
req.session.requests += 1 
}
}