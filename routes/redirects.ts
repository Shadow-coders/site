export default [{
    name: '/github',
    async execute(req:any,res:any,client:any) {
        let url = 'https://github.com/Shadow-coders/'
       if(!req.query.repo) return res.redirect(url)
       res.redirect(url + req.query.repo)
    }
}, {
    name: '/invite/bot', 
    async execute(req:any,res:any) {
        res.redirect('https://discord.com/oauth2/authorize?client_id=765578525818093608&permissions=261993005047&scope=bot%20applications.commands') 
    }
}, {
    name: '/invite/discord',
     execute: (req:any,res:any) => res.redirect('https://dsc.gg/shadow-bot') 
}]