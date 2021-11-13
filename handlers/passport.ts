import passport from "passport";
import DiscordPassport from 'passport-discord'
import config from "../config";
import adduser from './add'
var scopes = ['identify', 'guilds', 'guilds.join'];
export default function bind(app:any, url?: string) {
    passport.serializeUser(function(user:any, cb:any) {
		cb(null, user);
		// db.set('user_' + user.id, user)
	});



	passport.deserializeUser(function(id:any, cb:any) {
		cb(null, id);
	//	db.delete('user_' + id)
	});
    
	app.use(passport.initialize());
	app.use(passport.session());
	console.log(url)
    passport.use(new DiscordPassport.Strategy({
		clientID: '765578525818093608',
		clientSecret: config.client_secret,
		callbackURL: url ? url : `${config.makeURL()}auth/discord/callback` , // try going to it... its going to send you back home
		scope: scopes
	},

		async function(accessToken:any, refreshToken:any, profile:any, cb:Function) {
if(profile.guilds) {
			const guilds = profile.guilds
			if (guilds.length >= 200) {
				cb(null, profile)
                return;
			}
			await adduser(profile)
		}
			const keys = [accessToken, refreshToken]
			const data = { akey: keys[0], rkey: keys[1] }
			profile.keys = data
			cb(null, profile)
		}))
        const isAuth = (req:any, res:any, next:Function) => {
            if (req.user) {
                next()
            } else {
                res.redirect('back')
            }
        }
    app.get('/auth/discord', passport.authenticate('discord'));
	// app.get('/auth/discord/callback', passport.authenticate('discord', {
	// 	failureRedirect: '/error',
	// }), function(
	// 	req:any, res:any) {
	// 		console.log('Good')
	// 		res.redirect('/') // Successful auth
	// 	});
        
}