import express from "express";
import Passport from '../handlers/passport'
import passport from 'passport';
import config from '../config'
import session from 'express-session'
export const app = express();
export default app;
app.on('mount', () => {
    console.log('Mounted @app')
})
app.use(session({
    secret: ['e', 'app', 'kindasusngl', 'nsiefnsifwesgwagewsgsgesege/sg/es/\nr/g/esrg/e/srg/eth/tt/a/#W$?#Y?a?/3Y?Yr/Y?W$Y/4y/5e/Y/4?', 1.0, 5].join(),
    resave: false,
    name: '@app/shadow',
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
       // maxAge: 48 * 60 * 60 * 1000, INFINITE and beyond
    },

}))
app.get('/', (req:any,res:any) => {
   res.json({success:true})
})
app.get('/getuser', (req:any, res:any) => {
    if(!req.user) res.status(400).json({ loggedin:false })
    res.json(req.user)
})
Passport(app, config.makeURL() + '@app/auth/discord/callback', { name: '@app/discord'})
app.get('/auth/discord/callback', passport.authenticate('@app/discord', {
    failureRedirect: '/error',
 }), function(
 	req:any, res:any) {
         console.log('New @app/CALLBACKED req')
     res.json(req.user)
 	});

app.get('/error', (req:any, res:any) => {
    res.json({
error: true,
ip: req.ip.slice(2)
    })
})