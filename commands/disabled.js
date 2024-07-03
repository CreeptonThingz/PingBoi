const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
	.setName("disabled")
	.setDescription("Check disabled status of bot");

async function execute(interaction) {
	const bot = require("./../bot.js");

	await interaction.reply(bot.isDisabled ? "PingBoi is currently disabled" : "PingBoi is currently enabled");
}

module.exports = {
	data,
	execute,
};