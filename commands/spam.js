const { SlashCommandBuilder } = require('@discordjs/builders');

let spamVictim, spamStarter, mentionMessage, spamCount, spamPing, currentSession;

async function execute(interaction) {
    const bot = require('./../bot.js');

    if (bot.isPinging) {
        await interaction.reply({ content: "The transmutation circle is currently being used.", emphemeral: true });
        return;
    }

    spamVictim = interaction.options.getUser("target");
    spamStarter = interaction.user.id;
    mentionMessage = "<@" + spamStarter + "> " + (interaction.options.getString("message") !== null ? interaction.options.getString("message") : "");

    await spamVictim.send(mentionMessage)
        .then(async () => {
            await interaction.member.guild.members.fetch(spamVictim.id).then((member) => { interaction.reply("Now pinging " + member.nickname); });
            bot.client.user.setActivity("bully simulator", { type: "PLAYING" });

            module.exports.spamVictim = spamVictim;
            module.exports.spamStarter = spamStarter;
            module.exports.mentionMessage = mentionMessage;
            bot.isPinging = true;

            await setSpamPing(bot);
        })
        .catch(err => {
            console.error(err);

            interaction.reply({ content: "I am unable to bully them", emphemeral: true });
            bot.client.user.setActivity(bot.defaultStatus, { type: "WATCHING" });
            bot.isPinging = false;
        });
}

async function setSpamPing(bot) {
    spamCount = 1;

    module.exports.spamPing = await setInterval(() => {
        spamVictim.send(mentionMessage)
            .catch(err => {
                console.error(err);

                bot.client.users.cache.get(bot.ownerID).send("error: " + err);
                clearInterval(spamPing);
                bot.isPinging = false;
            });

        module.exports.spamCount = ++spamCount;
        module.exports.currentSession = calculateSpamTime();
    }, 3000);
}

function calculateSpamTime() {
    let time = "";

    let hours = Math.floor(spamCount/1200);
    let minutes = Math.floor(spamCount/20 - hours*60);
    let seconds = Math.floor(spamCount*3 - minutes*60);

    if (hours != 0) { time += hours.toString() + " hours, "; }
    if (minutes != 0) { time += minutes.toString() + " minutes, "; }
    if (seconds != 0) { time += seconds.toString() + " seconds "; }

    return time;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("spam")
        .setDescription("Bully someone")
        .addUserOption(option => option.setName("target").setDescription("Set target user").setRequired(true))
        .addStringOption(option => option.setName("message").setDescription("Set spam message")),
    execute,
    
    spamVictim,
    spamStarter,
    mentionMessage,
    spamCount,
    spamPing,

    currentSession
}