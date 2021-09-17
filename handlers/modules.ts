import * as Express from 'express'
import * as session from 'express-session'
import requestHandler from '../util/reqhandler'
export default (app: any) => {
app.use(Express.static('public'))
app.use(requestHandler)
app.engine('html', require('ejs-locals'));
// app.use(session({
//     secret: `fsrikbgvifhkbfiuksbfvkeiysfveiysfveilsyfvlseiyfeyfe'fe;rhfve;fhe'rfhe'irk'ge'rufb'eourgwfeuogf'3o484t394yt3489ty39478gy3480gyerhosihfeoslhg;ve[rge4-g]e=g-e]ro-ger]-en=cmexmez,eermnfvirpoejpfeirnvevneirlgvbherib`,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }))
app.set('trust proxy', 1)
}
