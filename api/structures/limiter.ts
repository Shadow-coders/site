import limiterE from 'express-rate-limit'
import config from '../../config'
export default function Limiter(params:any) {
    const { client } = params
    return limiterE({
        windowMs: 5 * 60 * 1000, // 15 minutes
        max: 100,
        handler: async (req:any,res:any) => {
            
res.status(429).send('To many requests!')
try {
    console.log(client.channels)
    let channel;
    if(client && client.channels) channel = await client.channels.fetch('829753754713718816');
//console.log(channel)
channel.send({ embeds: [
    {
        title: 'Ratelimit ',
        description: 'Someone was ratelimited on the follwoing path `' + `${config.makeURL()}api${req.url}` + '`',
        color: 0xff0000  
    }
]
});
        } catch (e) {
console.error(e)
        }
      }
    });
    
}