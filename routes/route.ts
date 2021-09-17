export default {
    name: '/',
    async execute(req:any,res:any,client:any) {
        const data = await client.add('partials/header.ejs', { client, req,res }) ;
        res.render('index', { client, req,res, add: client.add, async:true, headers: data })
    }
}