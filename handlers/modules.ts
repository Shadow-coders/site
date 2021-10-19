import * as Express from 'express'
import session from 'express-session'
import requestHandler from '../util/reqhandler'
export default (app: any) => {
app.use(Express.static('public'))
app.engine('html', require('ejs-locals'));
app.use(Express.json())
app.use(session({
    secret: ['e', 'e', 'e', 'nsiefnsifwesgwagewsgsgesege/sg/esr/g/esrg/e/srg/eth/tt/a/#W$?#Y?a?/3Y?Yr/Y?W$Y/4y/5e/Y/4?', 1.0, 5].join(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 48 * 60 * 60 * 1000, // 48 hours | 2 days
    },
}))
app.use(requestHandler)
app.set('trust proxy', 1)
}
