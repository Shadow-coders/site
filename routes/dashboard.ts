import { Client } from 'discord.js'
import config from '../config'
export default {
    name: '/dashboard',
    execute: (req:any,res:any,bot:any) => {
	const user = req.user
	const client = bot.shadow
        res.render('guild', {
			avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?width=214&height=214`,
			username: user.username,
			disc: user.discriminator,
			id: user.id,
			guilds: req.user.guilds,
		    client,
			req: req,
            config,
		})
    }
}