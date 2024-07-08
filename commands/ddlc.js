const { SlashCommandBuilder, MessageEmbed } = require("discord.js");

const data = new SlashCommandBuilder()
	.setName("ddlc")
	.setDescription("DDLC Yuri Chatbot")
	.addStringOption((option) =>
		option
			.setName("input")
			.setDescription("Send message to chatbot")
			.setRequired(true)
	);

async function execute(interaction) {
	const apiUrl =
		"https://api-inference.huggingface.co/models/Creepton/DDLCYuri-DialoGPT-small";
	const fetch = require("node-fetch");

	const payload = {
		inputs: {
			text: interaction.options.getString("input"),
		},
	};

	const headers = {
		Authorization: "Bearer " + process.env.YuriChatbotToken,
	};

	await interaction.deferReply();

	// query the server
	const response = await fetch(apiUrl, {
		method: "post",
		body: JSON.stringify(payload),
		headers: headers,
	});
	const responseData = await response.json();

	let botResponse = "";
	if (Object.prototype.hasOwnProperty.call(responseData, "generated_text")) {
		botResponse = responseData.generated_text;
	} else if (Object.prototype.hasOwnProperty.call(responseData, "error")) {
		botResponse = responseData.error;
	}

	const reply = new MessageEmbed()
		.setColor("#34003d")
		.setAuthor({
			// prettier-ignore
			name: "\"" + interaction.options.getString("input") + "\"",
			iconURL: interaction.member.displayAvatarURL(),
		})
		.setDescription(botResponse);

	interaction.editReply({ embeds: [reply] });
}

module.exports = {
	data,
	execute,
};
