module.exports = {
    name: "say",
    description: "makes the bot say something",
    execute(message, args) {
        if (args.length === 0) {
            message.channel.send("Type something, stupid.");
            return;
        }

        let repeatMessage = args.join(" ");

        message.delete();
        message.channel.send(repeatMessage);
    }
}