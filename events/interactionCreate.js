// Handle slash commands when received an interaction
const { Collection, Events } = require("discord.js");

const name = Events.InteractionCreate;

const execute = async (interaction) => {
    // Return if interaction is not a slash command
    if (!interaction.isChatInputCommand()) return;

    // Get details of command
    const command = interaction.client.commands.get(interaction.commandName);

    // Check if command exists
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    // Check cooldowns
    const { cooldowns } = interaction.client;

    if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 3;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;

    // Don't run command if user is still in cooldown
    if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1_000);
            return interaction.reply({ content: `Chill out bro. You can't use \`${command.data.name}\` for another <t:${expiredTimestamp}:R>.`, ephemeral: true });
        }
    }

    // Set cooldown for user
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    // Execute command
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
        } else {
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    }
}

module.exports = {
	name,
    execute
};