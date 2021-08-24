module.exports = {
    name: "spam",
    description: "bullies someone",
    execute(message, args, isPinging, setPinging, setSpamVictim, setSpamStarter, setMentionMessage, setSpamPing, client) {      
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
                message.channel.send("Now pinging " + spamVictim.displayName);
                client.user.setActivity("bully simulator", { type: "PLAYING" });

                setMentionMessage(mentionMessage);
                setSpamVictim(spamVictim);
                setSpamStarter(spamStarter);
                setPinging(true);
                setSpamPing();
                
            })
            .catch(err => {
                console.error(err);
                
                message.channel.send("I am unable to bully them.");
                client.user.setActivity("questionable content", { type: "WATCHING" });
                setPinging(false);
            });
        }
    }
}