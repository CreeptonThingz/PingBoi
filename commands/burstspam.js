function execute(message, args) {
    console.log(cooldown);
  
    if (cooldown == null) {
        mentionMessage = args.join(" ");
    
        if (spamVictim == null) {
            for (let i = 0; i < 3; i++) {
                message.author.send("Spam who");
            }    
            return;
        }
      
        for (let i = 0; i < 3; i++) {
            message.channel.send(mentionMessage);
        }

        cooldown = setTimeout(() => {
            cooldown = null;
        }, 5*1000);
    } else {
      message.channel.say("Command in cooldown, stop spamming");
    }
}

module.exports = {
    name: "burstspam",
    description: "Quick spam",
    execute,
}