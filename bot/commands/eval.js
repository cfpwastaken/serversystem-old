const discord = require("discord.js");
const fs = require("fs");
//const xpfile = require("../xp.json");
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
    commands: ['eval'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        if(message.author.id == "318394797822050315") {
            const result = eval(text);
            message.channel.send(result);
        }
    },
    permissions: [],
    requiredRoles: []
}