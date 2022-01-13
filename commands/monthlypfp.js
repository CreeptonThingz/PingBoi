let dailySpam;
let spamCount = 0;

module.exports = {
    name: "monthlypfp",
    description: "randomizes monthly pfp",
    execute(message, args) {
        const bot = require('./../bot');
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
    

        // Initiate Daily spam
        dailySpam = setInterval(function() {
            message.channel.send("<!" + aCertainGuyID + "> gets " + randChar2)
                .catch(err => {
                    console.error(err);

                    message.channel.send("Error lmoa");
                    clearInterval(dailySpam);
                });

            spamCount++;
        }, 86400000); // 1 day interval = 86.4M ms
    },
    dailySpam,
    spamCount
}