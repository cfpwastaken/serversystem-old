const discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const xpfile = require("../../xp.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");
const utils = require("../../utils/util-functions.js");
const axios = require("axios");

module.exports = {
    commands: ['music'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 1,
    clientcallback: async function(message, arguments, text, client) {
        // const { voice } = message.member;

        // if(!voice.channelID) {
        //     message.reply('Du musst in einem voicechannel sein.');
        //     return;
        // }

        // voice.channel.join().then((connection) => {
        //     const dispatcher = connection.play(path.join(__dirname, '../../lol.mp3'));
        //     dispatcher.on("end", end => {
        //         voice.channel.leave();
        //     });
        // });
        
        // client.player.play(message, arguments[0], message.member.user);

        // console.log("sadsw");
    },
    permissions: [],
    requiredRoles: []
}