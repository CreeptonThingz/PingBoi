const https = require('https');
const CLIENT_ID = "4f739b764aaf428";

module.exports = {
    name: "image",
    description: "search for image",
    execute(message, args, getRandomInt, Discord) {
        const imageQuery = args.join("+");
        let path = "/3/gallery/search/1?q_all=" + imageQuery;
        let imgurOptions = {
            hostname: "api.imgur.com",
            path: path,
            headers: {
                "Authorization": "Client-ID " + CLIENT_ID
            },
            method: "GET"
        };

        https.get(imgurOptions, (res) => {
            let data = "";

            res.on("data", (d) => {
                data += d;
            });

            res.on("end", () => {
                message.channel.send("Searching for " + imageQuery.split("+").join(" ").toLowerCase() + "...")
                    .then(async msg => {
                        imgurData = JSON.parse(data);
                        console.log("data:", imgurData.data[0]);

                        let randomInt = getRandomInt(imgurData.data.length-1);
                        let imageEmbed, imageTitle, imageLink;

                        if (imgurData.data[randomInt].ad_config.safeFlags.includes("album")
                            .catch(err => {
                                console.error(err);
                                msg.delete();
                                message.channel.send("Could not find image (probably because imgur API sucks at using itself)")
                            })) {
                            imageTitle = imgurData.data[randomInt].title;       
                            let galleryLink = imgurData.data[randomInt].link;    
                            imageLink = imgurData.data[randomInt].images[getRandomInt(imgurData.data[randomInt].images.length-1)].link;   

                            imageEmbed = new Discord.MessageEmbed()
                                .setColor("#89C623")
                                .setTitle(imageTitle)
                                .setURL(galleryLink)
                                .setImage(imageLink)
                                .setTimestamp();
                        } else {
                            imageTitle = imgurData.data[randomInt].title;        
                            imageLink = imgurData.data[randomInt].link;  

                            imageEmbed = new Discord.MessageEmbed()
                                .setColor("#89C623")
                                .setTitle(imageTitle)
                                .setURL(imageLink)
                                .setImage(imageLink)
                                .setTimestamp();
                        }

                        msg.delete();
                        message.channel.send(imageEmbed);
                    })
                    .catch(err => {
                        console.error(err);
                        msg.delete();
                        message.channel.send("Could not find image (probably because imgur API sucks at using itself)")
                    });
            });  
        }).on("error", (err) => {
            console.error(err);
        });
    }
}