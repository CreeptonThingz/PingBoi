let spamVictim, spamStarter, mentionMessage;

module.exports = {
    name: "spam",
    description: "bullies someone",
    execute(message, args) {      
        const bot = require("./../bot");
        
        if (bot.isPinging) { 
            message.channel.send("The transmutation circle is currently being used.");
        } else {
            spamVictim = message.mentions.members.first();
            spamStarter = message.author;
            mentionMessage = args.join(" ");

            if (spamVictim == null) {
                for (let i = 0; i < 5; i++) {
                    spamStarter.send("Spam who");
                }
                return;
            }

            spamVictim.send(mentionMessage)
            .then(() => {
                message.channel.send("Now pinging " + spamVictim.displayName);
                bot.client.user.setActivity("bully simulator", { type: "PLAYING" });

                bot.isPinging = true;
                bot.setSpamPing();
                
            })
            .catch(err => {
                console.error(err);
                
                message.channel.send("I am unable to bully them.");
                bot.client.user.setActivity(bot.defaultStatus, { type: "WATCHING" });
                bot.isPinging = false;
            });
        }
    },
    spamVictim,
    spamStarter,
    mentionMessage
}