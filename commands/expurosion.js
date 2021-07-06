const globalVars = require("../globalVars");

module.exports = {
    name: "expurosion",
    description: "disables bot",
    execute(message, isDisabled, setDisabled, ownerID) {
        if (isDisabled) {
            message.channel.send(
                "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b8/b806e5833e5aba0969ea9ea24c8515fd7cbceb93_full.jpg" + 
                "\nYamete Kudasai"
            );
        } else if (message.author.id == ownerID) {
            setDisabled(true);
            message.channel.send("Seeyanara");
        } else if (message.author.id != ownerID) {
            message.channel.send("Do you own this bot? That's what I thought.");
        }
    },
}