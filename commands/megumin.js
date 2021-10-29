module.exports = {
    name: "megumin",
    description: "megumin chants",
    execute(message) {
        const getRandomInt = require('./../bot');

        switch (getRandomInt(3)) {
            case 0:
                message.channel.send(
                    "Darkness blacker than black and darker than dark,\n" +
                    "I beseech thee, combine with my deep crimson.\n" +
                    "The time of awakening cometh\n" +
                    "Justice, fallen upon the infallible boundary,\n" +
                    "appear now as an intangible distortions!\n" +
                    "I desire for my torrent of power a destructive force:\n" +
                    "a destructive force without equal!\n" +
                    "Return all creation to cinders,\n" +
                    "and come frome the abyss!\n" +
                    "Explosion!"
                );
                break;
            case 1:
                message.channel.send(
                    "Oh, blackness shrouded in light,\n" +
                    "Frenzied blaze clad in night,\n" +
                    "In the name of the crimson demons,\n" +
                    "let the collapse of thine origin manifest.\n" +
                    "Summon before me the root of thy power hidden within the lands\n" +
                    "of the kingdom of demise!\n" +
                    "Explosion!"
                )
                break;
            case 2:
                message.channel.send(
                    "Crimson-black blaze, king of myriad worlds,\n" +
                    "though I promulgate the laws of nature,\n" +
                    "I am the alias of destruction incarnate\n" +
                    "in accordance with the principles of all creation.\n" +
                    "Let the hammer of eternity descend unto me!\n" +
                    "Explosion!"
                )
                break;
        }
    }
}