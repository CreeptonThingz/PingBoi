// When the client is ready, run this code (only once).
const { Events, PresenceUpdateStatus, ActivityType } = require("discord.js");

const defaultStatus = "the gacha system not giving me a S-Rank";

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setPresence({
			activities: [
				{
					name: defaultStatus,
					type: ActivityType.Watching,
				},
			],
			status: PresenceUpdateStatus.Online,
		});
	},
};
