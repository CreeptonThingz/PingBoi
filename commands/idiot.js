const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
    const bot = require('./../bot.js');

    switch (bot.getRandomInt(2)) {
        case 0:
            await interaction.reply("<@" + interaction.user.id + "> is an idiot")
            break;
        case 1:
            await interaction.reply("<@" + interaction.options.getUser("user") + "> is an idiot")
            break;
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("idiot")
        .setDescription("Bully or get bullied")
        .addUserOption(option => option.setName("user").setDescription("Target User").setRequired(true)),
    execute
}