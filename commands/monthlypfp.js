module.exports = {
    name: "monthlypfp",
    description: "randomizes monthly pfp",
    execute(message, args) {
        const bot = require('./../bot');

        if (message.author.id != bot.ownerID) {
            message.channel.send("One must have knowledge of all past selves before gaining the authority of this command");
            return;
        }

        let user1 = args.shift();
        let user2 = args.shift();

        randChar1 = args[bot.getRandomInt(args.length)];
        args.splice(args.indexOf(randChar1), 1);

        randChar2 = args[bot.getRandomInt(args.length)];
        args.splice(args.indexOf(randChar2), 1);

        message.channel.send(user1 + " gets " + randChar1);
        message.channel.send(user2 + " gets " + randChar2);
    }
}