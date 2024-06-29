// Require necessary command handling modules 
const fs = require("node:fs");
const path = require("node:path");

// Require necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

// Require token
const { TOKEN } = require("./config.json");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// const ownerID = "162672579025436673";
// const defaultStatus = "the world end on April 24, 2023 at 10:47:28 AM";

// let isDisabled = false;
// let isPinging = false;

// Load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
  	const command = require(filePath);

	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Read event files
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


// 
// Helper functions
//

// Minimum inclusive, Maximum exclusive
// function getRandomIntMin(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min) + min);
// }

// // Minimum (0) inclusive, Maximum exclusive
// function getRandomInt(max) {
//     max = Math.floor(max);
//     return Math.floor(Math.random() * max);
// }

// // Outputs random hex color code
// function randomColor() {
//     return Math.floor(Math.random()*16777215).toString(16);
// }

// module.exports = {
// 	// Functions
// 	getRandomInt,
// 	getRandomIntMin,
// 	randomColor,

// 	// Constants
// 	ownerID,
// 	client,
// 	defaultStatus,

// 	// Variables
// 	isPinging,
// 	isDisabled
// }

client.login(TOKEN);