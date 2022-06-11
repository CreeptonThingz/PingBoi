const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
    const bot = require('./../bot.js');

    if (!bot.isDisabled) {
        interaction.reply("HUH?! Did you __***SAY***__ something?!");
    } else if (message.author.id === bot.ownerID) {
        bot.isDisabled = false;
        interaction.reply("\*Summons inpenetrable shield\*");
    } else if (message.author.id !== bot.ownerID) {
        interaction.reply("ERROR: User is too inexperienced to use this command.");
    }}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("plotarmor")
        .setDescription("Enables the bot (Owner Only)"),
    execute
}