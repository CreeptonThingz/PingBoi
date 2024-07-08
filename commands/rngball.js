const { SlashCommandBuilder, MessageEmbed } = require("discord.js");

const data = new SlashCommandBuilder()
	.setName("rngball")
	.setDescription("8Ball but better")
	.addStringOption((option) =>
		option
			.setName("input")
			.setDescription("Ask a question")
			.setRequired(true)
	);

async function execute(interaction) {
	const bot = require("./../bot.js");

	const phrases = [
		// Yes statements
		"Yes",
		'The answer is the same to this: "Is anime good?"',
		"*Nods head*",
		"As sure as telling you Aidan won't come back",
		"I guess",
		"I suppose",
		"Does 1+1=2?",
		"Sure why not",
		"Yellow \nEmeralds \nSuck",
		":thumbsup:",
		"Obviously",
		"Indeed",

		// No statements
		"No",
		"Obviously not",
		"*Shakes head*",
		"You better not",
		"Did you say you're stupid? No? Well I guess there's your answer",
		"No lol xD",
		"How about ***no***",
		"Negative \nOperation",
		":thumbsdown:",
		"Denied",
		"Nah",

		// Other statements
		"Uhm...",
		"Hah, hah, did you say something?",
		"Sorry, too busy snorting crushed up anime figures",
		"I don't know man. But your waifu kinda trash ngl",
		"How about you **DON'T** ask me a pointless question",
		"Currently dividing by zero, please wait",
		"You're kidding, right?",
		"Look! Squirrel! *Runs away*",
		"It is but in my greatest knowledge that I must beseech you upon my answer that currently stands unknown",
		"Did you know that the age of consent is 18 years old?",
		"No! It's not an ecchi anime, how many times have I told you this? The story is god-tier so watch it",
		"Bruh",
	];

	const reply = new MessageEmbed()
		.setColor("#" + bot.randomColor())
		.setAuthor({
			name:
				interaction.member.nickname +
				' asks, "' +
				interaction.options.getString("input") +
				'"',
			iconURL: interaction.member.displayAvatarURL(),
		})
		.setTitle("RNGBall says...")
		.setDescription(phrases[bot.getRandomInt(phrases.length)]);

	if (
		interaction.options
			.getString("input")
			.toLowerCase()
			.includes("is anime good")
	) {
		reply.setAuthor({
			name: interaction.member.nickname + ' asks, "Am I stupid?"',
			iconURL: interaction.member.displayAvatarURL(),
		});
		reply.setDescription("Yes");
	}

	interaction.reply({ embeds: [reply] });
}

module.exports = {
	data,
	execute,
};
