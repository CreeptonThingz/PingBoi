module.exports = {
    name: "plotarmor",
    descrption: "enables the bot",
    execute(message, isDisabled, setDisabled, ownerID) {
        if (!isDisabled) {
            message.channel.send("HUH?! Did you __***SAY***__ something?!");
        } else if (message.author.id == ownerID) {
            setDisabled(false);
            message.channel.send("*Summons inpenetrable shield*");
        } else if (message.author.id != ownerID) {
            message.channel.send("ERROR: User is too inexperienced to use this command.");
        }
    }
}