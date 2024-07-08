const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
	.setName("random")
	.setDescription("Gives a random integer")
	.addIntegerOption((option) =>
		option
			.setName("maximum")
			.setDescription("Maximum Value")
			.setRequired(true)
	)
	.addIntegerOption((option) =>
		option.setName("minimum").setDescription("Minimum Value")
	);

async function execute(interaction) {
	const bot = require("./../bot.js");

	const maximum = interaction.options.getInteger("maximum");
	const minimum = interaction.options.getInteger("minimum");

	if (minimum > maximum) {
		await interaction.reply(
			'Lookup the definitions of "maximum" and "minimum"'
		);
		return;
	}

	if (minimum === null) {
		await interaction.reply(bot.getRandomInt(maximum + 1).toString());
	} else {
		await interaction.reply(
			bot.getRandomIntMin(minimum, maximum + 1).toString()
		);
	}
}

module.exports = {
	data,
	execute,
};
