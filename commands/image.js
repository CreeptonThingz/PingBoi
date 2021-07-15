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

// var Scraper = require('images-scraper');

// const google = new Scraper({
//     puppeteer: {
//         headless: true,
//         args: ["--no-sandbox"]
//     }
// })

// module.exports = {
//     name: "image",
//     description: "searches google for image",
//     execute(message, args, randomColor, getRandomInt, Discord) {
//         const imageQuery = args.join(" ");

//         if (!imageQuery) { return message.channel.send("Enter image name"); }

//         message.channel.send("Searching for " + imageQuery.toLowerCase() + "...")
//             .then(async msg => {
//                 const imageResults = await google.scrape(imageQuery, 200);
//                 const image = imageResults[getRandomInt(imageResults.length-1)];
//                 const imageEmbed = new Discord.MessageEmbed()
//                     .setColor(randomColor())
//                     .setTitle(image.title)
//                     .setImage(image.url)
//                     .setTimestamp()
                
//                 msg.delete();
//                 message.channel.send(imageEmbed);
//             });
//     }
// }

// const imgur = require('imgur');

// imgur.setClientId("4f739b764aaf428");
// imgur.setAPIUrl("https://api.imgur.com/3/");

// module.exports = {
//     name: "image",
//     description: "searches google for image",
//     execute(message, args, getRandomInt, Discord) {
//         const imageQuery = args.join(" ");

//         if (!imageQuery) { return message.channel.send("Enter image name"); }

//         const optionalParams = { 
//             sort: 'top',
//             dateRange: "all",
//         }

//         message.channel.send("Searching for " + imageQuery.toLowerCase() + "...")
//             .then(async msg => {
//                 imgur.search(imageQuery, optionalParams)
//                     .then(json => {      
//                         let randomInt = getRandomInt(Object.keys(json).length-1);
//                         let imageEmbed;

//                         if (json[randomInt].ad_config.safeFlags.includes("album")) {
//                             let imageTitle = json[randomInt].title;       
//                             let galleryLink = json[randomInt].link;    
//                             let imageLink = json[randomInt].images[getRandomInt(json[randomInt].images.length-1)].link;   
    
//                             imageEmbed = new Discord.MessageEmbed()
//                                 .setColor("#89C623")
//                                 .setTitle(imageTitle)
//                                 .setURL(galleryLink)
//                                 .setImage(imageLink)
//                                 .setTimestamp();
//                         } else {
//                             let imageTitle = json[randomInt].title;        
//                             let imageLink = json[randomInt].link;  
    
//                             imageEmbed = new Discord.MessageEmbed()
//                                 .setColor("#89C623")
//                                 .setTitle(imageTitle)
//                                 .setURL(imageLink)
//                                 .setImage(imageLink)
//                                 .setTimestamp();
//                         }

//                         msg.delete();
//                         message.channel.send(imageEmbed);
//                     })
//                     .catch(err => {
//                         console.error(err);

//                         message.channel.send("No image found :(");
//                     })

//             });
//     }
// }