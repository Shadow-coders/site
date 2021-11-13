import express from "express";
import Passport from '../handlers/passport'
import passport from 'passport';
export const app = express();
export default app;
app.on('mount', () => {
    console.log('Mounted @app')
})
app.get('/', (req:any,res:any) => {
   res.send({ messsage: 200 });
})
Passport(app)
app.get('/auth/discord/callback', passport.authenticate('discord', {
 	failureRedirect: '/error',
 }), function(
 	req:any, res:any) {
     res.json(req.user)
 	});