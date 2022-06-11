const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
    const bot = require('./../bot.js');

    await interaction.reply(bot.isDisabled ? "PingBoi is currently disabled" : "PingBoi is currently enabled");
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("disabled")
        .setDescription("Check disabled status of bot"),
    execute
}