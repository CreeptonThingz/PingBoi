const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientID, guildID } = require('./config.json');

const commands = [
  	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
]
  	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env['logintoken']);

rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
  	.then(() => console.log('Successfully registered application commands.'))
  	.catch(console.error);
// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');
// const { clientID, guildID } = require('./config.json');

// const fs = require('fs');
// const path = require('path');

// const commands = [];
// const commandsPath = path.join(__dirname, 'commands');
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const filePath = path.join(commandsPath, file);
// 	const command = require(filePath);
// 	commands.push(command.data.toJSON());
// }

// const rest = new REST({ version: '9' }).setToken(token);

// (async () => {
//   	try {
//     		console.log('Started refreshing application (/) commands.');
    
//     		await rest.put(
//     			  Routes.applicationGuildCommands(clientId),
//     			{ body: commands },
//     		);
    
//     		console.log('Successfully reloaded application (/) commands.');
//   	} catch (error) {
//   		  console.error(error);
//   	}
// })();