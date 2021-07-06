module.exports = {
    name: "idiot",
    description: "bully or get bullied",
    execute(message, args, getRandomInt) {
        if (args.length === 0) {
            message.channel.send("Who's the idiot, you?");
            return;
        }

        let idiot;

        switch (getRandomInt(2)) {
            case 0: 
                idiot = message.author.id;
                break;
            case 1:
                idiot = message.mentions.members.first();
                break;
        }

        message.channel.send("<@" + idiot + "> is an idiot");
    }
}