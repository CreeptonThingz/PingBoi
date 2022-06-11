const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
    const bot = require('./../bot.js');

    await interaction.reply(`🏓API Latency is ${Math.round(bot.client.ws.ping)}ms`);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    execute
}