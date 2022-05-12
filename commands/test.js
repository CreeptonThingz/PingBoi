function execute(message, args) {
    const bot = require("./../bot");

    console.log(bot.client.users.cache.get(bot.ownerID).send("urmummylol"));
}
module.exports = {
    name: "test",
    description: "xD",
    execute
}