import { Client } from "discord.js";
import { readdirSync } from 'fs'
export default function  (app:any,client:any,Add:any) {
    const files = readdirSync('routes').filter(f => f.endsWith('.ts') || !f)
    for(const fi of files) {
let file:any;
try{
file = require(`../routes/${fi}`)
} catch (e) {
    file = { e }
}
if(file.e) { 
console.error(file.e)
    continue;
}
client.add = Add
file = file.default
//console.log(file)
if(!file.type) file.type = 'get'
app[file.type](file.name, (req:any,res:any,next:Function) => file.execute(req,res,client,next))
}
    return;
}