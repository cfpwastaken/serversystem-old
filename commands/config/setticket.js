const discord = require("discord.js");
const fs = require("fs");
const xpfile = require("../../xp.json");
const serverstats = require("../../servers.json");
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
    commands: ['setticketchannel', 'setticket'],
    expectedArgs: '<new ticketchannel>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        let newticket = message.content.split(" ").slice(1).join("");

        serverstats[message.guild.id].ticket = newticket;

        message.channel.send("Der neue Ticketchannel ist **" + newticket + "**");

        fs.writeFile("../../servers.json", JSON.stringify(serverstats), function(err) {
            if(err) {
                console.log(err);
            }
        });
    },
    permissions: ["ADMINISTRATOR"],
    requiredRoles: []
}