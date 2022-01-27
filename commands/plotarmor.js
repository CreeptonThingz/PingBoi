module.exports = {
    name: "plotarmor",
    descrption: "enables the bot",
    execute(message) {
        const bot = require("./../bot");

        if (!bot.isDisabled) {
            message.channel.send("HUH?! Did you __***SAY***__ something?!");
        } else if (message.author.id == bot.ownerID) {
            bot.isDisabled = false;
            message.channel.send("*Summons inpenetrable shield*");
        } else if (message.author.id != bot.ownerID) {
            message.channel.send("ERROR: User is too inexperienced to use this command.");
        }
    }
}