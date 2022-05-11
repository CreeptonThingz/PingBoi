function execute(message) {
    const bot = require("./../bot");
    const spam = require("./spam");

    let status = bot.isPinging ? "PingBoi is currently pinging someone" : "PingBoi is currently not pinging someone";

    message.channel.send(status + "\n" + "Currently at: " + spam.spamCount + " pings");
}

module.exports = {
    name: "pinging",
    description: "check pinging status",
    execute,
}