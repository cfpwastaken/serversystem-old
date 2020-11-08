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
    callback: (msg, arguments, text) => {
        msg.channel.send(embed(":ping_pong: Pong!", `Latency: ${Date.now() - msg.createdTimestamp}ms\nAPI: ${Math.round(msg.client.ws.ping)}ms`, "RANDOM"));
    },
    permissions: [],
    requiredRoles: []
}