import { Guild } from "discord.js"
import config from "../config"
export default {
    name: '/dashboard/:id',
    async execute(req:any,res:any,client:any) {
        if(!req.user) res.status(403).json({ message: 403, code: 4.03 })
        const guild:Guild = client.shadow.guilds.cache.get(req.params.id)
        const header:any = await client.add('partials/header-dashboard.ejs', { config, client, req,res, user: req.user, avatar: `https://cdn.discordapp.com/avatars/${req.user?.id}/${req.user?.avatar}.gif?width=214&height=214`})
res.render('settings', { req,res,client: client.shadow, db: client.db, guild, header, config })
    }
}