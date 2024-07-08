const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
	.setName("monthlypfp")
	.setDescription("Randomizes monthly profile pictures (Owner Only)")
	.addUserOption((option) =>
		option.setName("user1").setDescription("First User").setRequired(true)
	)
	.addUserOption((option) =>
		option.setName("user2").setDescription("Second User").setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("characters")
			.setDescription("List of characters")
			.setRequired(true)
	);

async function execute(interaction) {
	const bot = require("./../bot.js");

	if (interaction.user.id !== bot.ownerID) {
		interaction.reply({
			content:
				"One must have knowledge of all past selves before gaining the authority of this command (Ur dumb lmoa)",
			ephemeral: true,
		});
		return;
	}

	const user1 = interaction.options.getUser("user1");
	const user2 = interaction.options.getUser("user2");
	const characters = interaction.options.getString("characters").split(" ");

	const randChar1 = characters[bot.getRandomInt(characters.length)];
	characters.splice(characters.indexOf(randChar1));
	const randChar2 = characters[bot.getRandomInt(characters.length)];

	await interaction.reply(
		"<@" +
			user1.id +
			"> gets " +
			randChar1 +
			"\n<@" +
			user2.id +
			"> gets " +
			randChar2
	);
}

module.exports = {
	data,
	execute,
};
