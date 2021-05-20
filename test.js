module.exports = (app, client, bot, db) => {
    const config = require('./config')
    //db
app.post('/api', (req,res) => {
    res.send('200, o')
    console.log('done, post recived')
})
    //end of db
    const passport = require('passport')
    const session = require('express-session')
     const getBotGuilds  = require('./api.js')
     var DiscordStrategy = require('passport-discord').Strategy;
  const { Webhook } = require('discord-webhook-node');
 const hook = new Webhook("https://discord.com/api/webhooks/818234890762977312/osdk9ZL3wu-BYr4LYI1mk-qfNBRjlT3v05WIP0Si9JN1ftWJy96_0zaskf3HQPf0Babe");
  var scopes = ['identify', 'guilds', 'guilds.join'];
  app.use(session({
   secret: config.secret || Date.now(),
   resave: false,
   saveUninitialized: false,
   cookie: { 
       httpOnly: true,
       secure: false,
       maxAge: 48 * 60 * 60 * 1000,
    },
 }))
  app.use(passport.initialize());
 app.use(passport.session());
 // pasport 
  passport.serializeUser(function (user,cb)  {
     cb(null, user);
     db.set('user_' + user.id, user)
  });
 
 
 
  passport.deserializeUser(function (id,cb) {
     cb(null, id);
     db.delete('user_' + id)
  });
 
 passport.use(new DiscordStrategy({
     clientID: '765578525818093608',
     clientSecret: config.client_secret,
     callbackURL: 'https://Shaodws-site-OWO.nongmerbot.repl.co/auth/discord/callback', // try going to it... its going to send you back home
     scope: scopes
 },
 
 async function(accessToken, refreshToken, profile, cb) {
   cb(null, profile)
  await db.set('last_user', profile)
  const guilds = profile.guilds
  if(guilds.length >= 100) {
      return;
  }
 const adduser = require('./add.js');
  await adduser()
  const keys = [accessToken, refreshToken]
  const data = {akey: keys[1], rkey: keys[2] }
 }));

 const isAuth = (req,res,next) => {
     if(req.user) {
         next()
     } else {
          res.redirect('back')
     }
 }
 app.get('/auth/discord', passport.authenticate('discord'));
 app.get('/auth/discord/callback', passport.authenticate('discord', {
     failureRedirect: '/'
 }), function( 
     req, res) {
     res.redirect('/user') // Successful auth
 });
 app.get('/user', isAuth, async (req, res) => {
     if (req.user) {
         const user = await db.get('user')
         res.render('index', { avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?width=214&height=214`,
           username: user.username,
           disc: user.discriminator,
           id: user.id,
           err: user.message || undefined,
           req: req
           })
     }
 });
 app.get('/', (req,res) => {
     if(req.user) return res.redirect('/user')
     res.render('index2', { req: req})
     res.redirect(500, '/logout')
 })
 
 app.get('/dashboard', isAuth, async (req, res) => {        
const user = req.user
console.log(user.guilds)
 const botguilds = await getBotGuilds()
 let bruh = JSON.stringify(botguilds)
     res.render('guild', { avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?width=214&height=214`,
           username: user.username,
           disc: user.discriminator,
           id: user.id,
           guilds: req.user.guilds,
           bot: bot.client,
           myguilds: bruh,
           perms: require('discord-permissions'),
           req: req
           })
 })
 app.get('/dashboard/check', isAuth, (req,res,next) => {
     const msg = db.get(req.query.text);
     const user = req.user
     if (msg == null) {
         res.send('not a guild')
     }
     const a = msg.includes(user);
     if (a == true) {
         res.redirect(`/dashboard/${req.query.text}`)
     } else {
         res.send(`could not find ${user} in ${msg} also here is the results neon = ${a}`)
         console.log('err')
     }
 })
 
 app.get('/start', (req, res) => {
     if (req.user) {
       return res.redirect('/secretstuff')
     }
     res.send('OK <a href="/auth/discord"> login </a>');
 
 })
 app.get('/adduser', (req, res) => {
     
     
     if (req.query.guild) {
         const data = db.get(req.query.guild)
         db.set(req.query.guild, `${data}, ${req.query.user}`)
         res.json({ ok: "true"})
     } else {
         res.json({error: "no guild"})
     }
 })
 app.get('/logout', (req, res) => {
     req.logOut();
     res.redirect('/')
 
 })

 app.get('/chec', (req,res) => { 
    const q =  req.query.type || undefined
    res.send(req.user.refreshToken)
 })
 app.get('/view', (req, res) => {
    if (req.query.file) {
        res.sendfile(`./${req.query.file}`);
    } else {
        res.redirect('/view?file=index.html')
    }
})
app.get('/ticket-view', (req,res)=>{
    if(!req.query.number) return res.send('err')
    try {
        res.sendfile(`./${req.query.file}`)
    } catch (e) {
        res.send(e)
    }
})
 // app.get('')
  /*app.use('*', (req,res) => {
   const ex = ['str']
   if(ex) {
       const user = req.user
    res.render('404', {
        avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?width=214&height=214`,
           username: user.username || undefined,
           disc: user.discriminator || undefined,
           id: user.id || undefined,
           err: user.message || undefined,
           req: req 
    })
   } 
     
 })
 */
 }
// done 
 
