function execute(message, args) {
    const spam = require("./spam");
    const bot = require("./../bot");
    
    let messageAuthor = message.author.id;

    if (args[0] == null) {
        message.channel.send("Which spam to stop bro (spam or daily)");
        return;
    }
  
    switch (args[0].toLowerCase()) {
        // Stop spam ping
        case "spam":
            if (!bot.isPinging) {
                message.channel.send("What ever do you mean \"stop\"?");
                return;
            } else if (messageAuthor == spam.spamVictim.id || messageAuthor == spam.spamStarter.id || messageAuthor == bot.ownerID) {              
                seconds = (spam.spamCount%30)*2;
                hours = Math.floor(spam.spamCount/1800);
                minutes = Math.floor(spam.spamCount/30);

                message.channel.send("https://i.redd.it/7rtkq25zvj751.jpg");
                message.channel.send(spam.spamVictim.displayName + " was pinged " + spam.spamCount + " times" + 
                                    "\nPinged for " + hours + " hours " + minutes + " minutes " + seconds + " seconds.");
                clearInterval(spam.spamPing);
                bot.isPinging = false;
                bot.client.user.setActivity(bot.defaultStatus, { type: "WATCHING" });
            } else {
                message.channel.send("This does not concern you, go along now");
                return;
            }
            break;
        // Stop daily spam (for aidan)
        case "daily":
            clearInterval(spam.dailySpam);
            message.channel.send("Bruh it took you " + spam.dailySpamCount + " days");    
            break;
        default:
          break;             
    }
}

module.exports = {
    name: "stop",
    description: "stop bullying",
    execute,
}