import keys from './key'
function check(req:any,res:any) {
	//console.log(req.headers)
	const setType = async (req:any,res:any,required?:any) => {
	let type;
	if(req.headers['Content-Type']) {
type = req.headers['Content-Type']
} else if(req.query['Content-Type']) {
    type = req.query['Content-Type']
} else if(req.body['Content-Type']) {
    type = req.body['Content-Type']
}
if(type === 'application/json')  {
	res.texttype = 'JSON'
} else if (type === 'application/yaml') {
	res.texttype = 'YAML'
} else if(type === 'image/png') {
	res.texttype = 'IMAGE'
} 
if(!type) { res.texttype = 'TEXT' }
}
setType(req,res)
let auth;
if(req.headers.authorization) {
auth = req.headers.authorization
} else if(req.query['Authorization']) {
    auth = req.query['Authorization']
} else if(req.body['Authorization']) {
    auth = req.body['Authorization']
}
 if(!auth) auth = ''
if(auth.startsWith('Bot')) auth = auth.split(' ')[1]
else if(auth.startsWith('Master')) auth = auth.split(' ')[1]
else if(auth.startsWith('Bearer')) auth = auth.split(' ')[1]
else 
 auth = null
return auth;
} 
export default async function (req:any,res:any,next:Function) {
const key = check(req,res)
if(!key) return res.status(401).json({ message: 'No Authorization, you can get a key at https://discord.gg/some-link' })
if(!await keys.getKey(key)) return res.status(403).json({ message: "Invalid Authorization, you can get a key at https://discord.gg/some-link "})
res.auth = await keys.getKey(key)
next()
}