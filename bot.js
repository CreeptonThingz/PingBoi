const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '.';
const ownerID = 162672579025436673;

let isDisabled = false;

// spam/stop command stuff
let isPinging = false;
let spamPing;
let spamCount = 0;
let spamVictim = "";
let spamStarter = "";
let mentionMessage = "";

client.commands = new Discord.Collection();

// filescan
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("PingBoi is online");
    client.user.setActivity('questionable content', { type: 'WATCHING' });
});


client.on('message', message => {
    if (isPinging) {
        spamPing = setTimeout(function() {
            spamVictim.send(mentionMessage);
            spamCount++;
        }, 1000);
    } 

    if (!message.content.startsWith(prefix) || message.author.bot || message.guild == null) { return; }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ping") { client.commands.get("ping").execute(message, client); }
    if (command === "expurosion") { client.commands.get("expurosion").execute(message, isDisabled, setDisabled, ownerID); }
    if (command === "plotarmor") { client.commands.get("plotarmor").execute(message, isDisabled, setDisabled, ownerID);}
    if (command === "disabled") { client.commands.get("disabled").execute(message, isDisabled); }
    if (command === "pinging") { client.commands.get("pinging").execute(message, isPinging); }

    if (!isDisabled) {
        if (command === "spam") { client.commands.get("spam").execute(message, args, isPinging, setPinging, setSpamCount, setSpamVictim, setSpamStarter, setMentionMessage); }
        if (command === "stop") { client.commands.get("stop").execute(message, isPinging, isDisabled, setDisabled, spamVictim, spamStarter, ownerID, spamCount, setPinging, spamPing); }
        if (command === "image") { client.commands.get("image").execute(message, args); }
        if (command === "say") { client.commands.get("say").execute(message, args); }
        if (command === "idiot") { client.commands.get("idiot").execute(message, args, getRandomInt); }
        if (command === "ubw") { client.commands.get("ubw").execute(message); }
        if (command === "megumin") { client.commands.get("megumin").execute(message, getRandomInt); }
        if (command === "rngball") { client.commands.get("rngball").execute(message, getRandomInt, randomColor, Discord); }
        if (command === "random") { client.commands.get("random").execute(message, args, getRandomInt, getRandomIntMin); }
    }
});

// Create functions to pass down
function setDisabled(booleanVal) { isDisabled = booleanVal; }
function setPinging(booleanVal) { isPinging = booleanVal; }
function setSpamCount(num) { spamCount = num; }
function setSpamVictim(userID) { spamVictim = userID; }
function setSpamStarter(userID) { spamStarter = userID; }
function setMentionMessage(text) { mentionMessage = text; }

function getRandomIntMin(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * max);
}

function randomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}

client.login("Njg5NDk2NzE0MzQ4MDY4ODgy.Xv1WWg.11hn3p0bVSYWvz6WEsxL9FebSac");