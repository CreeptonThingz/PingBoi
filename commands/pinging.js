const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
    const bot = require('./../bot.js');
    const spam = require('./spam.js');

    let status = bot.isPinging ? "PingBoi is currently pinging someone" : "PingBoi is currently not pinging someone";
    
    interaction.reply(
        status + 
        "\nCurrently at: " + spam.spamCount + " pings"  + 
        "\nPinging for " + spam.currentSession
    );
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pinging")
        .setDescription("Check pinging status of bot"),
    execute
}