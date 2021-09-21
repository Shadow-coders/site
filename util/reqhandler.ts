import {Client} from 'discord.js'
export default function  (req:any,res:any,next:Function) {
    if(!req.session) req.session = { requests: 0 }
    if(!req.session.requests) req.session.requests = 0
req.session.requests += 1 
//console.log(req.session)

next()
}