function execute(message) {
    const bot = require("./../bot");

    message.channel.send(`${Math.round(bot.lient.ws.ping)} ms`);
}

module.exports = {
    name: "ping",
    description: "this is a ping command",
    execute,
}