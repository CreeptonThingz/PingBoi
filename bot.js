const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
const keepAlive = require('./server.js');

const prefix = '.';
const ownerID = "162672579025436673";
const defaultStatus = "AP scores coming back as 0";

let isDisabled = false;
let isPinging = false;

// const fs = require('fs');
// const path = require('path');
// let client.commands = new Discord.Collection();
// const commandsPath = path.join(__dirname, 'commands');
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
//   	const filePath = path.join(commandsPath, file);
//   	const command = require(filePath);
  
//   	client.commands.set(command.data.name, command);
// }

client.once('ready', () => {
    console.log("PingBoi is online");
    client.user.setActivity(defaultStatus, { type: "WATCHING" });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) { return; }

    const command = client.commands.get(interaction.commandName);

    if (!command) { return; }

    if (command === "ping") {
        await interaction.reply("Pong!");
    }
  
    // try {
    //     await command.execute(interaction);
    // } catch (error) {
    //     console.error(error);
    //     await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    // }
});

// client.on('message', async message => {
//     // If message is from bot or from DMs
//     if (!message.content.startsWith(prefix) || message.author.bot || message.guild == null) { return; } 

//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     if (command === "help") { client.commands.get("help").execute(message); }
    
//     if (command === "expurosion") { client.commands.get("expurosion").execute(message); }
//     if (command === "plotarmor") { client.commands.get("plotarmor").execute(message); }
//     if (command === "monthlypfp") { client.commands.get("monthlypfp").execute(message, args); }

//     if (command === "ping") { client.commands.get("ping").execute(message); }
//     if (command === "disabled") { client.commands.get("disabled").execute(message); }
//     if (command === "pinging") { client.commands.get("pinging").execute(message); }

//     if (!isDisabled) {
//         if (command === "test") { client.commands.get("test").execute(message, args); }
//         if (command === "spam") { client.commands.get("spam").execute(message, args); }
//         if (command === "stop") { client.commands.get("stop").execute(message, args); }
//         if (command === "image") { client.commands.get("image").execute(message, args); }
//         if (command === "say") { client.commands.get("say").execute(message, args); }
//         if (command === "idiot") { client.commands.get("idiot").execute(message, args); }
//         if (command === "ubw") { client.commands.get("ubw").execute(message); }
//         if (command === "megumin") { client.commands.get("megumin").execute(message); }
//         if (command === "rngball") { client.commands.get("rngball").execute(message, args); }
//         if (command === "random") { client.commands.get("random").execute(message, args); }
//         if (command === "burstspam") { client.commands.get("burstspam").execute(message, args);  }
//     }
// });

// min inclusive, max exclusive
function getRandomIntMin(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// min 0 is inclusive, max exclusive
function getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * max);
}

function randomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}

module.exports = {
    // Functions
    getRandomIntMin,
    getRandomInt,
    randomColor,

    // Constant Variables
    ownerID,
    Discord,
    client,
    defaultStatus,

    // Updating Variables
    isPinging,
    isDisabled,
};

keepAlive();
client.login(process.env['logintoken']);