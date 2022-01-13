module.exports = {
    name: "random",
    description: "gives a random int",
    execute(message, args) {
        const bot = require('./../bot');

        // Errors check
        if (args.length > 2) {
            message.channel.send("Too many inputs");
            return;
        } else if (args.length == 0) {
            message.channel.send("No inputs");
            return;
        } else if (!Number.isInteger(parseInt(args[0])) && !Number.isInteger(parseInt(args[args.length-1]))) {
            message.channel.send("Given values are not numbers");
            return;
        } else if (args[0].indexOf('.') >= 0) {
            message.channel.send(args[0] + " is not an integer, stupid");
            return;
        }
        
        if (args.length == 2) {
            if (args[0] == args[1]) {
                message.channel.send(args[0]);
                return;
            }
    
            if (args[0] > args[args.length-1]) {
                message.channel.send("Stupid fricking idiot trying to get a non-existent number");
                return;
            }

            if (args[1].indexOf('.') >= 0) {
                message.channel.send(args[1] + " is not an integer, stupid");
                return;
            }
        }

        if (args.length == 1) {
            message.channel.send(bot.getRandomInt(parseInt(args[0])+1)); 
        } else if (args.length == 2) {
            message.channel.send(bot.getRandomIntMin(parseInt(args[0]), parseInt(args[1])+1));
        }
    }
}