const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("burstspam")
    .setDescription("Ping in a burst")
    .addUserOption(option => option.setName("user").setDescription("Target User").setRequired(true))
    .addStringOption(option => option.setName("input").setDescription("Add a message"));

const execute = async (interaction) => {
    const mentionMessage = "<@" + interaction.options.getUser("user").id + "> ";

    if (interaction.options.getString("input")) {
        mentionMessage += interaction.options.getString("input");
    }
    
    // Burst of three
    interaction.reply(mentionMessage);
    interaction.reply(mentionMessage);
    interaction.reply(mentionMessage);    
}

module.exports = {
    cooldown: 5,
    data,
    execute
}