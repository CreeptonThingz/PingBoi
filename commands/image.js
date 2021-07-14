var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
        headless: true,
        args: ["--no-sandbox"]
    }
})

module.exports = {
    name: "image",
    description: "searches google for image",
    execute(message, args, randomColor, getRandomInt, Discord) {
        const imageQuery = args.join(" ");

        if (!imageQuery) { return message.channel.send("Enter image name"); }

        message.channel.send("Searching for " + imageQuery.toLowerCase() + "...")
            .then(async msg => {
                const imageResults = await google.scrape(imageQuery, 200);
                const image = imageResults[getRandomInt(imageResults.length-1)];
                const imageEmbed = new Discord.MessageEmbed()
                    .setColor(randomColor())
                    .setTitle(image.title)
                    .setImage(image.url)
                    .setTimestamp()
                
                msg.delete();
                message.channel.send(imageEmbed);
            });
    }
}