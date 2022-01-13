module.exports = {
    name: "disabled",
    description: "checks status of bot",
    execute(message) {
        const bot = require('./../bot');

        let status = bot.isDisabled ? "PingBoi is currently disabled" : "PingBoi is currently enabled";
    
        message.channel.send(status);
    }
}