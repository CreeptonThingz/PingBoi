const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
	.setName("burstspam")
	.setDescription("Ping in a burst")
	.addUserOption(option => option
		.setName("user")
		.setDescription("Target User")
		.setRequired(true))
	.addStringOption(option => option
		.setName("input")
		.setDescription("Add a message"));

async function execute(interaction) {
	const targetUser = interaction.options.get("user");
	const inputMessage = interaction.options.get("input") || "";
	const mentionMessage = `<@${targetUser.id}> ${inputMessage}`.trim();

	try {
		// Burst of three
		interaction.reply(mentionMessage);
		interaction.followUp(mentionMessage);
		interaction.followUp(mentionMessage);
	} catch (error) {
		console.error("Error sending burst messages:", error);
		await interaction.reply({ content: "An error occurred while sending the messages.", ephemeral: true });
	}
}

module.exports = {
	cooldown: 5,
	data,
	execute,
};