const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
    const bot = require('./../bot.js');
    const spam = require('./spam.js');

    let status = bot.isPinging ? 
        "PingBoi is currently pinging someone" + 
        "\nCurrently at: " + spam.spamCount + " pings" + 
        "\nPinging for " + spam.currentSession
        : 
        "PingBoi is currently not pinging someone";
    
    interaction.reply(status);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pinging")
        .setDescription("Check pinging status of bot"),
    execute
}