const discord = require("discord.js");

module.exports = {
    commands: ['meme'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 1,
    description: "Get a meme from a random subreddit",
    callback: async function(message, arguments, text) {
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

        message.channel.send({ embeds: [Embed] });
    },
    permissions: [],
    requiredRoles: []
}