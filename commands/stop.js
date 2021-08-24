module.exports = {
    name: "stop",
    description: "stop bullying",
    execute(message, isPinging, setPinging, spamVictim, spamStarter, ownerID, spamCount, spamPing, client) {
        let messageAuthor = message.author.id;

        if (!isPinging) {
            message.channel.send("What ever do you mean \"stop\"?");
            return;
        } else if (messageAuthor == spamVictim.id || messageAuthor == spamStarter.id || messageAuthor == ownerID) {
            seconds = (spamCount*2)%30
            hours = Math.floor(spamCount/1800);
            minutes = Math.floor(spamCount/30);

            message.channel.send("https://i.redd.it/7rtkq25zvj751.jpg");
            message.channel.send(spamVictim.displayName + " was pinged " + spamCount + " times" + 
                                "\nPinged for about " + hours + " hours " + minutes + " minutes " + seconds + " seconds.");
            clearInterval(spamPing);
            setPinging(false);
            client.user.setActivity("questionable content", { type: "WATCHING" });
        } else {
            message.channel.send("This does not concern you, go along now");
            return;
        }

    }
}