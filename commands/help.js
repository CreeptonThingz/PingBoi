const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

async function execute(interaction) {    
    const commandList = new MessageEmbed()
    .setColor("#ffffff")
    .setTitle("Command List")
    .setAuthor({ name: "It's not like a wanted to help you or anything", iconURL: "https://static.wikia.nocookie.net/doki-doki-literature-club/images/2/2b/Natsuki_Illustration.png/revision/latest/top-crop/width/360/height/360?cb=20190227205202" })
    .setDescription("Confused on a command because every single command does something randomly weird?")
    .addFields(
        { name: "\u200B", value: "\u200B" }, // Spacer
        { name: ".help", value: "Receive a tsundere help page" }, 
        { name: "\u200B", value: "\u200B" }, 

        { name: "Developer Commands:", value: "\u200B" }, 
        { name: ".expurosion", value: "Cast Megumin's personal explosion spell on the bot, disabling it" },
        { name: ".plotarmor", value: "Summon Rho Aias to block literally anything, reviving the bot" },
        { name: ".monthlypfp", value: "It is quite literally in the most literal since stil 100% RNG"},
        { name: "\u200B", value: "\u200B" }, 
        
        { name: "Status Commands:", value: "\u200B" },
        { name: ".disabled", value: "Did Megumin frick up the bot? Find out here" },
        { name: ".pinging", value: "Is someone being abused? Find out here" },
        { name: ".ping", value: "Check latency" },
        { name: "\u200B", value: "\u200B" }, 

        { name: "Function Commands:", value: "\u200B" },
        { name: ".spam <mentioned user>", value: "Abuse a user's mental state" },
        { name: ".stop", value: "Save someone's mental state whether you started it or not" },
        { name: ".image <search query>", value: "\"Maybe I can finally find some ecchi pictures\"" },
        { name: ".say <message>", value: "Ever wanted to go incognito?" },
        { name: ".idiot <mentioned user>", value: "Take a risk, lose your pride or harm another's pride" },
        { name: ".ubw", value: "Receive the chant that \"Archer\" says"},
        { name: ".megumin", value: "Receive the chant that the almighty Megumin says to defeat her foes" },
        { name: ".rngBall <message>", value: "It's 100% RNG I swear" },
        { name: ".random <maximum> OR .random <mininmum> <maximum>", value: "It's still 100% RNG I swear" },
        { name: ".burstspam <mentioned user>", value: "Abuse mental state in a burst"}
        // 1 field remaining
    )
    .setTimestamp()
    .setFooter({ text: "Copyright Probably PingBoi", iconURL: "https://i.ytimg.com/vi/oPW3vVWcc8s/maxresdefault.jpg"});

    interaction.reply({ embeds: [commandList] });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Get help page"),
    execute,
}