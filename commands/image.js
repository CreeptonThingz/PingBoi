var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
        headless: true
    }
})

module.exports = {
    name: "image",
    description: "searches google for image",
    execute(message, args) {
        const imageQuery = args.join(" ");

        if (!imageQuery) { return message.channel.send("Enter image name"); }

        message.channel.send("Searching for " + imageQuery.toLowerCase() + "...")
            .then(async msg => {
                const imageResults = await google.scrape(imageQuery, 1);
                msg.delete();
                message.channel.send(imageResults[0].title);
                message.channel.send(imageResults[0].url);
            });
    }
}