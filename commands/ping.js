const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check bot latency");

const execute = async (interaction) => {
    await interaction.reply(`🏓API Latency is ${Math.round(interaction.client.ws.ping)}ms`);
}

module.exports = {
    data,
    execute
}