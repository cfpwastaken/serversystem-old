const discord = require("discord.js");
const fs = require("fs");
//const xpfile = require("../xp.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");
const utils = require("../../utils/util-functions.js");

module.exports = {
    commands: ['serverinfo', 'server'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        if(!message.guild) return;

        let server = {
            logo: message.guild.iconURL(),
            name: message.guild.name,
            banner: message.guild.bannerURL(),
            members: message.guild.memberCount,
            owner: message.guild.ownerID,
            createdAt: message.guild.createdAt,
            id: message.guild.id,
            region: message.guild.region,
            verified: message.guild.verified
        };

        let embed = new discord.MessageEmbed()
        .setTitle("Serverinfo")
        .setColor("RANDOM")
        .setThumbnail(server.logo)
        .addField("Name", server.name)
        .addField("Banner", server.banner)
        .addField("Nutzer", server.members)
        .addField("Besitzer", server.owner)
        .addField("Erstellt", server.createdAt)
        .addField("Id", server.id)
        .addField("Region", server.region)
        .addField("Verifiziert", server.verified);

        message.channel.send(embed);
    },
    permissions: [],
    requiredRoles: []
}