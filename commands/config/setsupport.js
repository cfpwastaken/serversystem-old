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
    commands: ['setsupport'],
    expectedArgs: '<new support role>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        let newsupport = message.content.split(" ").slice(1).join("");

        serverstats[message.guild.id].support = newsupport;

        message.channel.send("Die neue Supporterrolle ist **" + newsupport + "**");

        fs.writeFile("../../servers.json", JSON.stringify(serverstats), function(err) {
            if(err) {
                console.log(err);
            }
        });
    },
    permissions: ["ADMINISTRATOR"],
    requiredRoles: []
}