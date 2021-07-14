module.exports = {
    name: "spam",
    description: "bullies someone",
    execute(message, args, isPinging, setPinging, setSpamCount, setSpamVictim, setSpamStarter, setMentionMessage, client) {        
        if (isPinging) { 
            message.channel.send("The transmutation circle is currently being used.");
        } else {
            let spamVictim = message.mentions.members.first();
            let spamStarter = message.author;
            let mentionMessage = args.join(" ");

            if (spamVictim == null) {
                for (let i = 0; i < 5; i++) {
                    spamStarter.send("Spam who");
                }
                return;
            }

            spamVictim.send(mentionMessage)
            .then(() => {
                setSpamVictim(spamVictim);
                setSpamStarter(spamStarter);
                setMentionMessage(mentionMessage);
                message.channel.send("Now pinging " + spamVictim.displayName);
                setSpamCount(1);
                setPinging(true);
                client.user.setActivity("bully simulator", { type: "PLAYING" });
            })
            .catch(err => {
                console.error(err);
                
                message.channel.send("I am unable to bully them.");
                setPinging(false);
            });
        }
    }
}