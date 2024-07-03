const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop bullying");

async function execute(interaction) {
    const bot = require("./../bot.js");
    const spam = require("./spam.js");

    let messageAuthor = interaction.user.id;

    if (!bot.isPinging) {
        interaction.reply({ content: "What ever do you mean \"stop\"?", ephemeral: true });
        return;
    } else if (messageAuthor != spam.spamVictim.id || messageAuthor != bot.ownerID || messageAuthor != spam.spamStarter) {
        interaction.reply({ content: "This does not concern you, go along now", ephemeral: true });
        return;
    }

    interaction.reply("https://i.redd.it/7rtkq25zvj751.jpg");
    interaction.member.guild.members.fetch(spam.spamVictim.id).then((member) => { 
        bot.client.channels.cache.get(interaction.channelId).send(
            member.nickname + " was pinged " + spam.spamCount + " times" + 
            "\nPinged for " + spam.currentSession);
    });
    clearInterval(spam.spamPing);
    bot.isPinging = false;
    bot.client.user.setActivity(bot.defaultStatus, { type: "WATCHING" });
}

module.exports = {
    data,
    execute
};