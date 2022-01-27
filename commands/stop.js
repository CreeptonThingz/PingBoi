module.exports = {
    name: "stop",
    description: "stop bullying",
    execute(message, args, isPinging, setPinging, spamStarter, spamCount, spamPing, client) {
        const spam = require("./spam");
        const bot = require("./../bot");
        
        let messageAuthor = message.author.id;

        // Stop spam ping
        if (args[0].toLowerCase() == "spam") {
            if (!bot.isPinging) {
                message.channel.send("What ever do you mean \"stop\"?");
                return;
            } else if (messageAuthor == spam.spamVictim.id || messageAuthor == spam.spamStarter.id || messageAuthor == bot.ownerID) {
                seconds = (bot.spamCount%30)*2;
                hours = Math.floor(bot.spamCount/1800);
                minutes = Math.floor(bot.spamCount/30);

                message.channel.send("https://i.redd.it/7rtkq25zvj751.jpg");
                message.channel.send(spam.spamVictim.displayName + " was pinged " + bot.spamCount + " times" + 
                                    "\nPinged for " + hours + " hours " + minutes + " minutes " + seconds + " seconds.");
                clearInterval(bot.spamPing);
                bot.isPinging = false;
                client.user.setActivity("questionable content", { type: "WATCHING" });
            } else {
                message.channel.send("This does not concern you, go along now");
                return;
            }
        }
        
        // Stop daily spam (for aidan)
        if (args[0].toLowerCase() == "daily") {
            const monthlypfp = require("./monthlypfp");

            clearInterval(monthlypfp.dailySpam);
            message.channel.send("Bruh it took you " + monthlypfp.spamCount + " pings");
        }
    }
}