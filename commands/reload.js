const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads a command.")
    .addStringOption(option => option
        .setName("command")
        .setDescription("The command to reload.")
        .setRequired(true));

async function execute(interaction) {
    // Need to make developer only
    const commandName = interaction.options.getString("command", true).toLowerCase();
    const command = interaction.client.commands.get(commandName);

    // Check if command to reload exists
    if (!command) {
        return interaction.reply(`There is no command with name \`${commandName}\`!`);
    }	

    // Reload the command
    delete require.cache[require.resolve(`./${command.data.name}.js`)];

    try {
        const newCommand = require(`./${command.data.name}.js`);
        interaction.client.commands.set(newCommand.data.name, newCommand);
        await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
    } catch (error) {
        console.error(error);
        await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
    }
}

module.exports = {
	data,
	execute
};