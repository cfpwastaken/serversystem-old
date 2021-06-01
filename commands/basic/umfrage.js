const discord = require("discord.js");
const fs = require("fs");
//const xpfile = require("../xp.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");
const utils = require("../../utils/util-functions.js");

module.exports = {
    commands: ['umfrage'],
    expectedArgs: '<Frage>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        message.delete();
        message.channel.send(utils.embed("Umfrage", text, "RANDOM", "Umfrage System")).then(msg=>{
            msg.react('👍').then(r => {
                msg.react('👎');
            });
        });
    },
    permissions: [],
    requiredRoles: []
}