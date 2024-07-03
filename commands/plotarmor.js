const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
	.setName("plotarmor")
	.setDescription("Enables the bot (Owner Only)");

async function execute(interaction) {
	const bot = require("./../bot.js");

	if (!bot.isDisabled) {
		interaction.reply("HUH?! Did you __***SAY***__ something?!");
	} else if (interaction.user.id === bot.ownerID) {
		bot.isDisabled = false;
		/* eslint-disable-next-line */
		interaction.reply("\*Summons inpenetrable shield\*");
	} else if (interaction.user.id !== bot.ownerID) {
		interaction.reply("ERROR: User is too inexperienced to use this command.");
	}
}

module.exports = {
	data,
	execute,
};