let spamVictim = "";
let spamStarter = "";
let mentionMessage = ""
let spamCount = 0;
let spamPing;

let currentSession = "";

function execute(message, args) {
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
            
            module.exports.spamVictim = spamVictim;
            module.exports.spamStarter = spamStarter;
            module.exports.mentionMessage = mentionMessage;
            bot.isPinging = true;
            
            setSpamPing(bot);  
        })
        .catch(err => {
            console.error(err);

            message.channel.send("I am unable to bully them.");
            bot.client.user.setActivity(bot.defaultStatus, { type: "WATCHING" });
            bot.isPinging = false;
        });
    }
}

function setSpamPing(bot) {     
    spamCount = 1;

    spamPing = setInterval(function() {
        spamVictim.send(mentionMessage)
            .catch(err => {
                console.error(err);

                bot.client.users.cache.get(bot.ownerID).send("error: " + err)
                clearInterval(spamPing);
                bot.isPinging = false;
            });
      
        module.exports.spamCount = ++spamCount;

        // Calculate time pinging
        currentSession = "";
      
        let hours = Math.round(spamCount/1200);
        let minutes = Math.round(spamCount/20 - hours*60);
        let seconds = Math.round(spamCount*3 - minutes*60);
    
        if (hours != 0) { currentSession += hours.toString() + " hours, "; }
        if (minutes != 0) { currentSession += minutes.toString() + " minutes, "; }
        if (seconds != 0) { currentSession += seconds.toString() + " seconds "; }
    
        module.exports.currentSession = currentSession;
    }, 3000);

    module.exports.spamPing = spamPing;
}

module.exports = {
    name: "spam",
    description: "bullies someone",
    
    execute,
    
    spamVictim,
    spamStarter,
    mentionMessage,
    spamCount,
    spamPing,

    currentSession,
}