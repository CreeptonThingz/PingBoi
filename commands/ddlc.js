const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
    const bot = require("../bot.js");
    const apiUrl = "https://api-inference.huggingface.co/models/Creepton/DDLCYuri-DialoGPT-small"
    const fetch = require("node-fetch")
  
    // switch (interaction.options.getSubcommand()) {
    //     case "start":
    //         interaction.reply("Starting")
    //         break;
    //     case "stop":
    //         interaction.reply("Stopping")
    //         break;
    //     case "chat":
    //         interaction.reply("Bruh")
    //         break;
    // }

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

    interaction.editReply(botResponse);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ddlc")
        .setDescription("DDLC Yuri Chatbot")
        .addStringOption(option => option.setName("input").setDescription("Send message to chatbot").setRequired(true)),
        // .addSubcommand(subcommand => 
        //     subcommand
        //         .setName("start")
        //         .setDescription("Starts up chatbot model"))
        // .addSubcommand(subcommand => 
        //     subcommand
        //         .setName("stop")
        //         .setDescription("Stops chatbot model"))
        // .addSubcommand(subcommand => 
        //     subcommand
        //         .setName("chat")
        //         .setDescription("Talk with chatbot")
        //         .addStringOption(option => 
        //             option
        //                 .setName("input")
        //                 .setDescription("Send message")
        //                 .setRequired(true))),
    execute
}