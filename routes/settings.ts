import config from '../config'
export default {
    name: '/settings',
    execute: (req:any,res:any,bot:any) => {
	const user = req.user
        res.render('user-settings', {
			avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?width=214&height=214`,
			username: user.username,
			disc: user.discriminator,
			id: user.id,
		    client,
			req: req,
            config,
		})
    }
}