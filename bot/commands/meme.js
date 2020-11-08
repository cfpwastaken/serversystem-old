const discord = require("discord.js");
const fs = require("fs");
const xpfile = require("../xp.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");

function embed(title, desc, color, footer) {
    let embed = new discord.MessageEmbed()
    .setTitle(title)
    .setDescription(desc)
    .setColor(color)
    .setFooter(footer + " | ServerSystem");
    return embed;
}

module.exports = {
    commands: ['meme'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        var subreddits;
        var name = "Meme";
        if(message.content.split(" ").length === 1) {
            subreddits = [
                "memes"
            ];
        } else {
            var memetype = message.content.split(" ")[1];
            if(memetype == "amongus") {
                subreddits = [
                    "amongusmemes"
                ];
                name = "Among Us Meme";
            } else {
                message.reply("Sorry, ich kenne r/" + memetype + " nicht!");
                return;
            }
        }
        let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length))];

        let img = await require("imageapi.js")(subreddit);

        const Embed = new discord.MessageEmbed()
        .setTitle(name)
        .setColor("RANDOM")
        .setImage(img);

        message.channel.send(Embed)
    },
    permissions: [],
    requiredRoles: []
}