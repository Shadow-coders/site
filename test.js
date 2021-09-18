guilds.filter(g => {
const guild = client.guilds.cache.get(g.id);
return guild ? true : false;
}).map((g) => client.guilds.cache.get(g.id)).forEach(g => { 
 if(!g.members.cache.get(user.id).permissions.has('MANAGE_SERVER')) {

    return;
} 
`${config.makeURL()}/dashboard/${g.id}` `${g.name}`
if(g.icon) { g.iconURL() }
if(!g.icon) {g.nameAcronym  }
})