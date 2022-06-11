const { SlashCommandBuilder } = require('@discordjs/builders');

let cooldown;

async function execute(interaction) {
    const bot = require("../bot.js");

    if (cooldown == null) {
        const mentionMessage = "<@" + interaction.options.getUser("user").id + "> ";

        if (interaction.options.getString("input") != null) {
            mentionMessage += interaction.options.getString("input");
        }
        
        // Error Check (uneeded?)
        
        // if (interaction.options.getUser("user").id == null) {
        //     for (let i = 0; i < 3; i++) {
        //         await interaction.reply({content: "Spam who", ephemeral: true });
        //     }    
        //     return;
        // }
      
        for (let i = 0; i < 3; i++) {
            bot.client.channels.cache.get(interaction.channelId).send(mentionMessage);
        }

        cooldown = setTimeout(() => {
            cooldown = null;
        }, 5*1000);
    } else {
        message.channel.say("Command in cooldown, stop spamming");
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("burstspam")
        .setDescription("Ping in a burst")
        .addUserOption(option => option.setName("user").setDescription("Target User").setRequired(true))
        .addStringOption(option => option.setName("input").setDescription("Add a message")),
    execute
}