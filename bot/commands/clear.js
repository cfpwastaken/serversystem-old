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
    commands: ['clear', 'c'],
    expectedArgs: '<anzahl>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        let msgs = message.content.split(" ").slice(1).join("");

        if(isNaN(msgs)) return message.reply("Geb ne Zahl an du kek");
        message.delete();
        message.channel.bulkDelete(msgs);
        message.channel.send("Habe " + msgs + " Nachrichten gelöscht").then(msg=>msg.delete({timeout: "3000"}));
    },
    permissions: ["MANAGE_MESSAGES"],
    requiredRoles: []
}