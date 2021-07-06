module.exports = {
    name: "pinging",
    description: "check pinging status",
    execute(message, isPinging) {
        let status = isPinging ? "PingBoi is currently pinging someone" : "PingBoi is currently not pinging someone";

        message.channel.send(status);
    }
}