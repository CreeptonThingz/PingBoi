module.exports = {
    name: "ping",
    description: "this is a ping command",
    execute(message, client) {
        message.channel.send(`${Math.round(client.ws.ping)} ms`);
    }
}