const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
    const bot = require("./../bot.js");
    let numbers = interaction.user.id
  
    console.log(numbers)
    console.log(bot.ownerID)
    console.log(numbers == bot.ownerID)
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Force bot to say something"),
    execute
}