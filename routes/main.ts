import config from '../config'
export default {
    name: '/',
    async execute(req:any,res:any,client:any) {
    
        const data = await client.add('partials/header.ejs', { config, client, req,res, user: req.user, avatar: `https://cdn.discordapp.com/avatars/${req.user?.id}/${req.user?.avatar}.gif?width=214&height=214`}) ;
        res.render('index', { client, req,res, add: client.add, headers: data, shadow: await client.users.fetch('765578525818093608'), user: req.user, avatar: `https://cdn.discordapp.com/avatars/${req.user?.id}/${req.user?.avatar}.gif?width=214&height=214`, config })
    }
}