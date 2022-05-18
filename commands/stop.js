function execute(message, args) {
    const spam = require("./spam");
    const bot = require("./../bot");
    
    let messageAuthor = message.author.id;

    if (!bot.isPinging) {
        message.channel.send("What ever do you mean \"stop\"?");
        return;
    } else if (messageAuthor == spam.spamVictim.id || messageAuthor == spam.spamStarter.id || messageAuthor == bot.ownerID) {
        message.channel.send("https://i.redd.it/7rtkq25zvj751.jpg");
        message.channel.send(spam.spamVictim.displayName + " was pinged " + spam.spamCount + " times" + 
                            "\nPinged for " + spam.currentSession);
        clearInterval(spam.spamPing);
        bot.isPinging = false;
        bot.client.user.setActivity(bot.defaultStatus, { type: "WATCHING" });
    } else {
        message.channel.send("This does not concern you, go along now");
        return;
    }
}

module.exports = {
    name: "stop",
    description: "stop bullying",
    execute,
}