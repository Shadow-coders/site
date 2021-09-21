import { model, Schema } from 'mongoose'
const schema = new Schema({
    id: String,
    name: String,
    perms: Number,
    type: String
})
export default model("api-keys", schema)