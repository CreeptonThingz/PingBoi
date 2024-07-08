const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
	.setName("say")
	.setDescription("Force bot to say something")
	.addStringOption((option) =>
		option
			.setName("input")
			.setDescription("Repeated Text")
			.setRequired(true)
	);

async function execute(interaction) {
	const channel = interaction.client.channels.cache.get(
		interaction.channelId
	);
	const repeatMessage = interaction.options.getString("input");

	channel.send(repeatMessage);
}

module.exports = {
	data,
	execute,
};
