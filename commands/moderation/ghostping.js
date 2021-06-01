const discord = require("discord.js");
const fs = require("fs");
const xpfile = require("../../xp.json");
const serverstats = require("../../servers.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");
const utils = require("../../utils/util-functions.js");
const axios = require("axios");
const { CanvasRenderService } = require("chartjs-node-canvas");

const width = 800
const height = 600

const chartCallback = (ChartJS) => {
    ChartJS.plugins.register({
        beforeDraw: (chartInstance) => {
            const { chart } = chartInstance;
            const { ctx } = chart;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, chart.width, chart.height);
        }
    });
};

module.exports = {
    commands: ['setghostpingchannel', 'setghostping'],
    expectedArgs: '<Channel>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 1,
    callback: async function(message, arguments, text) {
        const { mentions, guild } = message;

        const targetChannel = mentions.channels.first();
        if(!targetChannel) {
            message.reply("Du musst einen Channel angeben.")
            return;
        }

        serverstats[message.guild.id].ghostping = targetChannel.id;

        message.channel.send("Der neue GhostPing Channel ist **" + targetChannel + "**");

        fs.writeFile("../../servers.json", JSON.stringify(serverstats), function(err) {
            if(err) {
                console.log(err);
            }
        });
    },
    permissions: ["ADMINISTRATOR"],
    requiredRoles: []
}