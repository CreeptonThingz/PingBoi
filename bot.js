const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '.';
const ownerID = 162672579025436673;

let isDisabled = false;
let isPinging = false;

// Create functions to pass down
function setDisabled(booleanVal) { isDisabled = booleanVal; }

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("PingBoi is online");
});


client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot || message.guild == null) { return; }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ping") { client.commands.get("ping").execute(message, client); }
    if (command === "expurosion") { client.commands.get("expurosion").execute(message, isDisabled, setDisabled, ownerID); }
    if (command === "disabled") { client.commands.get("disabled").execute(message, isDisabled); }
    if (command === "plotarmor") { client.commands.get("plotarmor").execute(message, isDisabled, setDisabled, ownerID);}
});

client.login("Njg5NDk2NzE0MzQ4MDY4ODgy.Xv1WWg.11hn3p0bVSYWvz6WEsxL9FebSac");