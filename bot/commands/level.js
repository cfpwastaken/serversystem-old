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
    commands: ['ping'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        let user = message.mentions.users.first() || message.author;

        if(!xpfile[user.id]) {
            xpfile[user.id] = {
                xp: 0,
                level: 1,
                reqxp: 100
            };

            fs.writeFile("./xp.json", JSON.stringify(xpfile), function(err) {
                if(err) {
                    console.log(err);
                }
            });
        }

        //let embed = new discord.MessageEmbed()
        //.setTitle("Level")
        //.setColor("RANDOM")
        //.addField("Level", xpfile[user.id].level)
        //.addField("XP", xpfile[user.id].xp)
        //.addField("XP benötigt", xpfile[user.id].reqxp);
        const card = new canvacord.Rank()
            .setUsername(message.author.username)
            .setDiscriminator(message.author.discriminator)
            .setLevel(parseInt(xpfile[user.id].level))
            .setCurrentXP(parseInt(xpfile[user.id].xp))
            .setRequiredXP(parseInt(xpfile[user.id].reqxp))
            .setAvatar(message.author.displayAvatarURL({format: "png", size: 1024}));
        
        const img = await card.build();

        message.channel.send(new discord.MessageAttachment(img, "card.png"));
    },
    permissions: [],
    requiredRoles: []
}