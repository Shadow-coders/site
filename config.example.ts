interface LoggerOptions {
    LogsUrl: String,
    StatusUrl: String
}
interface Config {
    port: Number,
    prottocal: String,
    domain: String,
    makeURL: Function,
    prefix: String[],
    usesport: Boolean,
    bot: any,
    client_secret: any,
    shadow_token: any,
    mongouri: any,
    database_key: any
    logger: LoggerOptions
}
const config:Config = {
port: 3000,
prottocal: 'http://',
domain: 'localhost',
usesport: true,
makeURL: () => {
    return `${config.prottocal}${config.domain}${config.usesport ? `:${config.port}/` : '/'}`
},
bot: {
    token: ''
},
shadow_token: '',
prefix: [''],
mongouri: 'mongodb+srv://<username>:<Password>@<db_string_name>/<cluster>?retryWrites=true&w=majority',
logger: { LogsUrl: '', StatusUrl: ''},
client_secret: '',
database_key: ''
}
export default config;