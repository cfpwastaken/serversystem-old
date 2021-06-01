const discord = require("discord.js");
const fs = require("fs");
//const xpfile = require("../xp.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");
const utils = require("../../utils/util-functions.js");

module.exports = {
    commands: ['userinfo', 'user'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        let user = message.mentions.users.first() || message.author;

        let userinfo = {
            avatar: user.avatarURL(),
            name: user.username,
            discrim: user.discriminator,
            id: user.id,
            status: user.presence.status,
            bot: user.bot,
            createdAt: user.createdAt
        };

        let embed = new discord.MessageEmbed()
        .setTitle("Nutzerinfo")
        .setColor("RANDOM")
        .setThumbnail(userinfo.avatar)
        .addField("Name", userinfo.name)
        .addField("Discrim", userinfo.discrim)
        .addField("Id", userinfo.id)
        .addField("Status", userinfo.status)
        .addField("Bot", userinfo.bot)
        .addField("Erstellt", userinfo.createdAt);

        message.channel.send(embed);
    },
    permissions: [],
    requiredRoles: []
}