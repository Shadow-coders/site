import config from "../config";
import fetch from 'node-fetch'


const TOKEN = config.shadow_token
async function adduser(user:any) {
	const response = await fetch(`https://discord.com/api/v8/guilds/778350378445832233/members/${user.id}
`, {
			method: 'PUT',
			headers: {
				Authorization: `Bot ${TOKEN}`,
				"Content-type": 'application/json'
			},
			body: JSON.stringify({ access_token: user.accessToken })
		});
	return response.json();
}
export default (adduser);