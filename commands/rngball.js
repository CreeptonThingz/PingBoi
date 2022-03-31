function execute(message, args) {
    const bot = require('./../bot');

    let memberUsername = message.member.displayName;
    let memberAvatar = message.author.displayAvatarURL();
    let recallMessage = args.join(" ");

    const phrases = [
        // Yes statements
        "Yes",
        "The answer is the same to this: \"Is anime good?\"",
        "*Nods head*",
        "As sure as telling you Aidan won't come back",
        "I guess",
        "I suppose",
        "Does 1+1=2?",
        "Sure why not",
        "Yellow \nEmeralds \nSuck",
        ":thumbsup:",
        "Obviously",

        // No statements
        "No",
        "Obviously not",
        "*Shakes head*",
        "You better not",
        "Did you say you're stupid? No? Well I guess there's your answer",
        "No lol xD",
        "How about ***no***",
        "Negative \nOperation",
        ":thumbsdown:",
        "Denied",

        // Other statements
        "Uhm...",
        "Hah, hah, did you say something? No? Okay",
        "Sorry, too busy snorting crushed up anime figures",
        "I don't know man. But your waifu kinda trash ngl",
        "How about you **DON'T** ask me a pointless question",
        "Currently dividing by zero, please wait",
        "You're kidding, right?",
        "Look! Squirrel! *Runs away*",
        "It is but in my greatest knowledge that I must beseech you upon my answer that currently stands unknown",
        "Did you know that the age of consent is 18 years old?",
        "No! It's not an ecchi anime, how many times have I told you this? The story is god-tier so watch it"
    ];

    const reply = new bot.Discord.MessageEmbed()
        .setColor("#" + bot.randomColor)
        .setAuthor(memberUsername + " asks, \"" +  recallMessage + "\"", memberAvatar)
        .setTitle("RNGBall says...")
        .setDescription(phrases[bot.getRandomInt(phrases.length)]);

    if (recallMessage.length == 0 || recallMessage.toLowerCase().startsWith("is anime good")) {
        reply.setAuthor(memberUsername + " asks, \"Am I stupid?\"", memberAvatar);
        reply.setDescription("Yes, very stupid");
    }

    message.channel.send(reply);
}

module.exports = {
    name: "rngball",
    description: "8ball but better",
    execute,
}