module.exports = {
    name: "image",
    description: "search for image",
    execute(message, args) {
        const getRandomInt = require('./../bot');
        const Discord = require('discord.js');
        const fetch = require('node-fetch');
        const CLIENT_ID = "4f739b764aaf428";
        const imageQuery = args.join("+");

        message.channel.send("Searching for " + imageQuery.split("+").join(" ").toLowerCase() + "...")
            .then(async msg => { // search for tag first and switch to plan b if undefined
                let imageEmbed, imageTitle, imageLink, albumLink;

                let url = "https://api.imgur.com/3/gallery/t/" + imageQuery + "/viral/all/"   
                let imgurOptions = {
                    headers: {
                        "Authorization": "Client-ID " + CLIENT_ID
                    },
                    method: "GET"
                }
        
                let imgurData = JSON.parse(await fetch(url, imgurOptions)
                    .then(res => res.text())
                    .catch(err => console.error(err)));

                if (imgurData.data.total_items <= 0) { // If tag is empty
                    url = "https://api.imgur.com/3/gallery/search/viral/all/?q=" + imageQuery;
                    imgurData = JSON.parse(await fetch(url, imgurOptions)
                        .then(res => res.text())
                        .catch(err => console.error(err)));

                    if (imgurData.data.length == 0) {
                        msg.delete();
                        message.channel.send("Could not find image");
                        return;
                    }

                    let randomInt = getRandomInt(imgurData.data.length);
                    imageTitle = imgurData.data[randomInt].title;
                    albumLink = imgurData.data[randomInt].link;

                    if (imgurData.data[randomInt].is_album) {
                        url = "https://api.imgur.com/3/album/" + imgurData.data[randomInt].id + "/images";

                        let albumData = JSON.parse(await fetch(url, imgurOptions)
                            .then(res => res.text())
                            .catch(err => console.error(err)));

                        imageLink = albumData.data[getRandomInt(albumData.data.length)].link;
                    } else {
                        imageLink = albumLink;
                    }
                } else {
                    let randomInt = getRandomInt(imgurData.data.items.length-1);
                    imageTitle = imgurData.data.items[randomInt].title;
                    albumLink = imgurData.data.items[randomInt].link;
                    
                    if (imgurData.data.items[randomInt].is_album) { // If selection is an album of images
                        url = "https://api.imgur.com/3/album/" + imgurData.data.items[randomInt].id + "/images";

                        let albumData = JSON.parse(await fetch(url, imgurOptions)
                            .then(res => res.text())
                            .catch(err => console.error(err)));

                        imageLink = albumData.data[getRandomInt(albumData.data.length)].link;
                    } else {
                        imageLink = albumLink;
                    }
                }

                // Errors: if .mp4 file, if no result

                if (imageLink.endsWith(".mp4") || imageLink.endsWith(".gif")) {
                    msg.delete();
                    message.channel.send(imageTitle + "\n" + albumLink);
                    return;
                }

                imageEmbed = new Discord.MessageEmbed()
                    .setColor("#89C623")
                    .setTitle(imageTitle)
                    .setURL(albumLink)
                    .setImage(imageLink)
                    .setTimestamp();

                msg.delete();
                message.channel.send(imageEmbed);
            })
            .catch(err =>  {
                console.error(err);
                return;
            });
    }
}