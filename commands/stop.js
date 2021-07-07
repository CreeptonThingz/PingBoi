module.exports = {
    name: "stop",
    description: "stop bullying",
    execute(message, isPinging, isDisabled, setDisabled, spamVictim, spamStarter, ownerID, spamCount, setPinging, spamPing) {
        let messageAuthor = message.author.id;

        if (!isPinging) {
            message.channel.send("What ever do you mean \"stop\"?");
            return;
        } else if (messageAuthor != spamVictim || messageAuthor != spamStarter || messageAuthor != ownerID) {
            message.channel.send("This does not concern you, go along now");
            return;
        }

        message.channel.send("https://i.redd.it/7rtkq25zvj751.jpg");
        message.channel.send(spamVictim.displayName + ` was pinged ${spamCount+1} times`);
        clearTimeout(spamPing);
        setPinging(false);
    }
}