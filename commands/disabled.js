const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("disabled")
    .setDescription("Checks disabled status of bot");

async function execute(message) {
    const bot = require('./../bot');

    let status = bot.isDisabled ? "PingBoi is currently disabled" : "PingBoi is currently enabled";

    message.channel.send(status);
}

module.exports = {
    data,
    execute
}