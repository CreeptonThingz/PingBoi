const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
	.setName("ubw")
	.setDescription("Get Archer chant from Fate/stay night");

async function execute(interaction) {
	await interaction.reply(
		"I am the bone of my sword.\n" +
			"Steel is my body and fire is my blood.\n" +
			"I have created over a thousand blades.\n" +
			"Unknown to Death,\n" +
			"Nor known to Life.\n" +
			"Have withstood pain to create many weapons\n" +
			"Yet, those hands will never hold anything\n" +
			"So as I pray, Unlimited Blade Works"
	);
}

module.exports = {
	data,
	execute,
};
