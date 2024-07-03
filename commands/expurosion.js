const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
	.setName("expurosion")
	.setDescription("Disables bot (Owner Only)");

async function execute(interaction) {
	const bot = require("./../bot.js");

	if (bot.isDisabled) {
		interaction.reply(
			"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b8/b806e5833e5aba0969ea9ea24c8515fd7cbceb93_full.jpg" +
            "\nYamete Kudasai",
		);
	} else if (interaction.user.id === bot.ownerID) {
		bot.isDisabled = true;
		interaction.reply("Seeyanara");
	} else if (interaction.user.id !== bot.ownerID) {
		interaction.reply("Do you own this bot? That's what I thought.");
	}
}

module.exports = {
	data,
	execute,
};