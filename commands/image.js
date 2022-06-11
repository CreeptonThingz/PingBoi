const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
    const bot = require('./../bot.js');
    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("44a20c71539654ff8e754c35d6326bf23fe34652c5f9468d9a8d752ec7609112");
    
    const params = {
        engine: "google",
        q: interaction.options.getString("query").split(" ").join("+"),
        google_domain: "google.com",
        gl: "us",
        hl: "en",
        tbm: "isch"
    };
    
    search.json(params, (data) => 
        interaction.reply(data["images_results"][bot.getRandomInt(data["images_results"].length)]["original"])
            .catch(err => {
                console.error(err);
                interaction.reply({ content: "Uh oh something broke", ephemeral: true });
            }));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("image")
        .setDescription("Search for image")
        .addStringOption(option => option.setName("query").setDescription("Input Search Query").setRequired(true)),
    execute
}