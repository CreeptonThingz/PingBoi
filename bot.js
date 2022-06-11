const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const ownerID = "162672579025436673";
const defaultStatus = "AP scores coming back as 0";

let isDisabled = false;
let isPinging = false;

// Filescan
const fs = require('fs');
client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}


// Client stuff
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


// Minimum inclusive, Maximum exclusive
function getRandomIntMin(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// Minimum (0) inclusive, Maximum exclusive
function getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * max);
}

// Outputs random hex color code
function randomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}

module.exports = {
	// Functions
	getRandomInt,
	getRandomIntMin,
	randomColor,

	// Constants
	ownerID,
	client,
	defaultStatus,

	// Variables
	isPinging,
	isDisabled
}

client.login(process.env.TOKEN);

