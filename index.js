const mongoose = require("mongoose");
const config = require('./config.js')
const { Database } = require("quickmongo");
const db = new Database(config.monguri, 'sites');
 // var db = require('quick.db');
const express = require('express');
const path = require('path');
const canvacord = require('canvacord')
let OAuthClient = require('disco-oauth');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(config.webhook);
const app = express();
const error = "{\"error\": \"user sent post request\"}"
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");

require('./discordauth')(app);
const Discord = require('discord.js');
const client = new Discord.Client();

const mongo = require('dbdjs.mongo').default
mongoose.connect(config.monguri, {
   useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  keepAlive: true
})
const dbd = require("aoi.js")
 
const bot = new dbd.Bot({
  token: config.token, //Discord Bot Token
  prefix: ["?&?"], //Change PREFIX to your Prefix
   database: mongo
})

require('./test.js')(app, client, bot, db);
require("./bot.js")(client, app);
client.login(config.bot.token);
app.use(express.urlencoded({ extened: true }));
app.get('/alive-check', (req, res) => {
    res.json({ status: "OK"})
})

    db.get('user').then(console.log)

require('./endpoints.js')(app, client, bot);


 
bot.onMessage() // Allows Commands to Executed
 
bot.command({
name: "ping", 
code: `Pong! \`$ping\`` 
})
const data_user = JSON.stringify(db.get('user'))
bot.command({
    name: "info", 
    code: `
    $djseval[const h = require('nomsy-paste');
h(${data_user}, 'json').then(r => {
    message.author.send('latested db info: ' + r);
    message.channel.send("some facts on them \`\`\`json \n " + 'check [/ dms /]'+ '\`\`\`')

    console.log(r)
})]
    `
})
db.set('data', 'cool').then(console.log)
bot.command({
    name: "eval",
    code: `$eval[$message]`
})

// cookie session
db.on("ready", () => {
    console.log("Database connected!");
   // const channel = client.channels.get('')
   // channel.send('Databse connected at <mongdb://\*\*\*\*\*:\*\*\*\*> \n > connected to al vars')
 
});


app.get('/dash', (req, res) => {
    res.render('login');
})
app.get('/test/test', (req, res) => {
    res.send('<img class="chatlog__author-avatar" src="https://cdn.discordapp.com/avatars/566766267046821888/a_c88ef38c085fa0d733b3d36fcbbf04cc.gif">')
})
app.get('/redirect', (req, res) => {
   if (req.qurey.url) {
    if (req.query.path == true) {
        res.redirect(`./${req.query.url}`);
    } else {
        res.redirect(`${req.query.url}`)
    } 
} else {
    res.send('err')
}
})

app.post('/servercount', (req, res) => {
    // db.set('servercount', req.body.server_count)
    console.log('servercount Pushed from bot!')
    res.send('OK')
})
app.get('/index.html', (req, res) => {
    res.sendfile('./index.html')
})
app.get('/:path/wmsg', (req, res) => {
   

hook.send(`765669027552559145,${req.query.text}`);
res.redirect(`/${req.params.path}`)
})

app.get('/render', (req, res) => {
    res.render('fea')
})


app.get('/servercount', (req, res) => {
    const count = db.get('servercount')
    res.json({ status: 200, count: count})
})
app.set('view engine','ejs');

// mongoose login

app.post('/', (req, res) => {
    res.json({ error: "i cant support POST"})    .catch(e => {
        console.dir('nice')
    })
})

app.get('/ticket', (req, res) => {
   const auth = req.query.auth
   if (auth === "redirect") {
    res.sendfile('./ticket.png')
   }
   else {
       res.json({status: 401, error: "not authorised! only with auth you can do this!"}) 
   }
})

//testyy
console.log('==============================')
console.log('\n none \n');
console.log('==============================')
//end of testy
app.get('/api/triggered', async (req, res) => {
    let avatar = req.query.img ||  res.send('Missing a ?img=<img link>')
        let image = await canvacord.Canvas.trigger(avatar);
   res.set("Content-Type", "image/png")
     res.send(image)
}) 
app.get('/url', (req, res) => {
res.send(`the base url is ${db.get('url')}`)
})

 
app.get('/url', (req, res) => {
res.send(`the base url is ${db.get('url')}`)
})

app.listen(config.port, () => {
  const hook = new Webhook(config.webhook);
 hook.setUsername('starter logs');
const embed = new MessageBuilder()
.setTitle('im online')
.setColor('#00ff00')
.setDescription(`hello im on the port of \`${config.port}\` running the api and site!`)
.setTimestamp();
 
hook.send(embed);
});




// login system!



app.get('/close', (req, res) => {
   res.send(` <body onload="window.close">
   <script> window.close() </script> 
   <h1> hi </h1>
   </body>
   `)
})

// router
app.use('/api/v1/', require('./routes/api/v1'))
app.use(require('./routes'));
app.use((req, res) => {
   // res.status(404).send(` <body onload="window.replace('/')"> <h1> 404, redirecting </h1> <script> function load() { setTimeout(window => window.replace("/"), 3000)} </script> </body> <title> 404 </title>`)

    
})



// DISCORD BOT


// db? crap
 db.set('url', 'https://Shaodws-site-OWO.nongmerbot.repl.co')
 const perms = require('discord-permissions')
 console.log(db.get('765669027552559145'))
 console.log(perms.resolvePermission(`335544320`)
)
