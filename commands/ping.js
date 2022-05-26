const SlashCommandBuilder = required('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check latency");

function execute(message) {
    const bot = require("./../bot.js");

    message.channel.send(`${Math.round(bot.client.ws.ping)} ms`);
}

module.exports = {
    data,
    execute
}