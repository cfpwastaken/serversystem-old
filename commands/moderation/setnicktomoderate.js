const discord = require("discord.js");
const fs = require("fs");
const xpfile = require("../../xp.json");
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
    commands: ['setmodnick', 'setmoderatenick'],
    expectedArgs: '<Nickname>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 1,
    callback: async function(message, arguments, text) {
        let newmodnick = message.content.split(" ").slice(1).join("");

        serverstats[message.guild.id].modnickname = newmodnick;

        message.channel.send("Der neue ModNickname ist **" + newprefix + "**");

        fs.writeFile("../../servers.json", JSON.stringify(serverstats), function(err) {
            if(err) {
                console.log(err);
            }
        });
    },
    permissions: ["ADMINISTRATOR"],
    requiredRoles: []
}