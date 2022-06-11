const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
    const bot = require("./../bot.js");
    const repeatMessage = interaction.options.getString("input");

    bot.client.channels.cache.get(interaction.channelId).send(repeatMessage);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Force bot to say something")
        .addStringOption(option => option.setName("input").setDescription("Repeated Text").setRequired(true)),
    execute
}