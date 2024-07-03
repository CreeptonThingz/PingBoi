const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
	.setName("ping")
	.setDescription("Check bot latency");

async function execute(interaction) {
	await interaction.reply(`🏓API Latency is ${Math.round(interaction.client.ws.ping)}ms`);
}

module.exports = {
	data,
	execute,
};