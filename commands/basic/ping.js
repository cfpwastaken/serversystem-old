const discord = require("discord.js");
const fs = require("fs");
//const xpfile = require("../xp.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");
const utils = require("../../utils/util-functions.js");

module.exports = {
    commands: ['ping'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    callback: async function(msg, arguments, text) {
        msg.channel.send(utils.embed(":ping_pong: Pong!", `Latency: ${Date.now() - msg.createdTimestamp}ms\nAPI: ${Math.round(msg.client.ws.ping)}ms`, "RANDOM"));
    },
    permissions: [],
    requiredRoles: []
}