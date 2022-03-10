function execute(message) {
    const bot = require("./../bot");

    let status = bot.isPinging ? "PingBoi is currently pinging someone" : "PingBoi is currently not pinging someone";

    message.channel.send(status);
}

module.exports = {
    name: "pinging",
    description: "check pinging status",
    execute,
}