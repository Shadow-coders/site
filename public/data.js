export class Data {
    constructor(data) {
this.data = data;
let type;
if(Array.isArray(data)) type = 'array'
if(data.test && data.toString && data.toString().startsWith('/')) type = 'regex'
if(!type) type = typeof data;
this.type = type;
    }
    toString() {
        return this.data.toString()
    }
    toJSON() {
        return {
            data: this.data,
            type: this.type
        }
    }
    toArray() {
        return Array.isArray(this.data) ? this.data : [this.data]
    }
    flatten() {
        let json = this.toJSON()
        json.array = this.toArray()
        json.string = this.toString()
        return json;
    }
}