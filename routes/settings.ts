import config from '../config'
export default {
    name: '/settings',
    execute: async (req:any,res:any,bot:any) => {
//	console.log('RES on user-settings');
const client = bot.shadow
const header:any = await bot.add('partials/header-dashboard.ejs', { config, client: bot.shadow, req,res, user: req.user, avatar: `https://cdn.discordapp.com/avatars/${req.user?.id}/${req.user?.avatar}.gif?width=214&height=214`})
const user = req.user
        res.render('user-settings', {
			avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?width=214&height=214`,
			username: user.username,
			disc: user.discriminator,
			id: user.id,
		    client: bot,
			req, res,
            config,
		})
    }
}