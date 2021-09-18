import config from '../config'
export default {
    name: '/dashboard',
    execute: (req:any,res:any,client:any) => {
	const user = req.user
        res.render('guild', {
			avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?width=214&height=214`,
			username: user.username,
			disc: user.discriminator,
			id: user.id,
			guilds: req.user.guilds,
		    client,
			perms: require('discord-permissions'),
			req: req,
            config,
		})
    }
}