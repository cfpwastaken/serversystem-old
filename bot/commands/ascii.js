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
    commands: ['ascii'],
    expectedArgs: '<text>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 9999999999999,
    callback: (message, arguments, text) => {
        let content = message.content.split(" ").slice(1).join(" ");

        if(!content) return message.reply("-ascii Hallo Welt");

        ascii.font(content, "Doom", function(err, result){
            if(err) {
                return message.channel.send("O_o");
            }

            message.channel.send("```" + result + "```");
        });
    },
    permissions: [],
    requiredRoles: []
}