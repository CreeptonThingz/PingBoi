module.exports = {
    name: "disabled",
    description: "checks status of bot",
    execute(message, isDisabled) {
        let status = isDisabled ? "PingBoi is currently disabled" : "PingBoi is currently enabled";
    
        message.channel.send(status);
    }
}