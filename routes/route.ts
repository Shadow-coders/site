export default {
    name: '/',
    async execute(req:any,res:any,client:any) {
        const data = await client.add('partials/header.ejs', { client, req,res }) ;
        res.render('index', { client, req,res, add: client.add, headers: data, shadow: await client.users.fetch('765578525818093608') })
    }
}