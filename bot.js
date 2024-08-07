// Require necessary command handling modules
const fs = require("fs");
const path = require("path");

// Require necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require("discord.js");

// Require token
require("dotenv").config();
const { TOKEN } = process.env;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// let isDisabled = false;
// let isPinging = false;

// Enable cooldowns
client.cooldowns = new Collection();

// Load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(
			`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
		);
	}
}

// Read event files
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
	.readdirSync(eventsPath)
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

module.exports = {
	// // Constants
	// ownerID,
	// client,
	// defaultStatus,
	// // Variables
	// isPinging,
	// isDisabled
};

client.login(TOKEN);
