import config from "../config"

export default {
    name: '/ssh-terminal',
    execute: async (req:any, res:any) => {
if(!req.user) return res.status(403)
if(!['566766267046821888'].includes(req.user.id)) return res.status(401)
res.render('ssh-terminal')
    }
}