export default {
    name: '/logout',
    execute: (req:any,res:any) => {
        req.logOut();
		res.redirect('/')
    }
}