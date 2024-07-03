const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
	.setName("pinging")
	.setDescription("Check pinging status of bot");

async function execute(interaction) {
	const bot = require("./../bot.js");
	const spam = require("./spam.js");

	const status = bot.isPinging ?
		"PingBoi is currently pinging someone" +
        "\nCurrently at: " + spam.spamCount + " pings" +
        "\nPinging for " + spam.currentSession
		:
		"PingBoi is currently not pinging someone";

	interaction.reply(status);
}

module.exports = {
	data,
	execute,
};