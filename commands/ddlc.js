const { SlashCommandBuilder, MessageEmbed } = require("discord.js");

const data = new SlashCommandBuilder()
    .setName("ddlc")
    .setDescription("DDLC Yuri Chatbot")
    .addStringOption(option => option
        .setName("input")
        .setDescription("Send message to chatbot")
        .setRequired(true));

async function execute(interaction) {
    const apiUrl = "https://api-inference.huggingface.co/models/Creepton/DDLCYuri-DialoGPT-small"
    const fetch = require("node-fetch")

    const payload = {
        inputs: {
            text: interaction.options.getString("input")
        }
    };

    const headers = {
        'Authorization': 'Bearer ' + process.env.YuriChatbotToken
    };

    await interaction.deferReply();
  
    // query the server
    const response = await fetch(apiUrl, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: headers
    });
    const data = await response.json();
    
    let botResponse = '';
    if (data.hasOwnProperty('generated_text')) {
        botResponse = data.generated_text;
    } else if (data.hasOwnProperty('error')) {
        botResponse = data.error;
    }

    let reply = new MessageEmbed()
        .setColor("#34003d")
        .setAuthor({ name: "\"" + interaction.options.getString("input") + "\"", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(botResponse);

    interaction.editReply({ embeds: [reply] });
}

module.exports = {
    data,
    execute
};