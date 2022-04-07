function execute(message, args) {
    const bot = require('./../bot');
    const spam = require("./spam");
  
    let aCertainGuyID = 162676746108272640;

    if (message.author.id != bot.ownerID) {
        message.channel.send("One must have knowledge of all past selves before gaining the authority of this command (Ur dumb lmoa)");
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

    spam.startDailySpam(aCertainGuyID, randChar2, bot);
}

module.exports = {
    name: "monthlypfp",
    description: "randomizes monthly pfp",
    execute,
}