import fs from 'fs'
import Model from '../models/key'
class keys {
    keys: any
    path: any
  public  constructor() {
this.path = './keys.json'
this.keys = this._getKeys()
    }
    _getKeys() {
        if(!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify({}))
        }
        return JSON.parse(fs.readFileSync(this.path).toString())
    }
    createKey(token:any, name:any) {
        let keyobj = { id: token, perms: 32, type: 'BEARER',  name, };
        new Model(keyobj).save()
    return { id: token, perms: 32, type: 'BEARER', name: name };
    }
    getKey(key:any): Promise<any> {
        return new Promise(async (res,rej) => {
const data = await Model.find({ id: key }, (err,ress) => {
  if(err) rej(err)
  res(ress[0])  
})
    })
    }

}
let key = new keys()
export default key;
