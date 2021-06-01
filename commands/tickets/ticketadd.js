// message.channel.updateOverwrite(message.guild.id, {SEND_MESSAGES: true});
/*
const { mentions, guild } = message;

        const targetChannel = mentions.channels.first();
*/

const discord = require("discord.js");
const fs = require("fs");
//const xpfile = require("../xp.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");
const utils = require("../../utils/util-functions.js");

module.exports = {
    commands: ['ticketadd'],
    expectedArgs: '<Nutzer>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        message.delete();
        if(message.channel.name.includes("ticket-")) {
            if(message.mentions.users.first()) {
                message.channel.updateOverwrite(message.mentions.users.first(), { SEND_MESSAGES: true, ATTACH_FILES: true, VIEW_CHANNEL: true });
                message.reply("Nutzer hinzugefügt!");
            } else {
                message.reply("Du musst einen Nutzer erwähnen!");
            }
        } else {
            console.log("P");
        }
    },
    permissions: [],
    requiredRoles: []
}