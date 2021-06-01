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
    commands: ['covid', 'corona'],
    expectedArgs: '<Tage>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 1,
    callback: async function(message, arguments, text) {
        const days = parseInt(arguments[0]) || 30;
        const url = "https://api.covidtracking.com/v1/us/daily.json";
        let { data: results } = await axios.get(url);
        results = results.slice(0, days).reverse();

        const labels = [];
        const deaths = [];
        const cases = [];
        const recovered = [];

        for(const result of results) {
            let date = String(result.date);
            const year = date.substring(0, 4);
            const month = date.substring(4, 6);
            const day = date.substring(6, 8);
            labels.push(`${day}/${month}/${year}`);

            deaths.push(result.death);
            cases.push(result.positive);
            recovered.push(result.recovered);
        }

        const canvas = new CanvasRenderService(width, height, chartCallback);

        const configuration = {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: 'Infizierte',
                        data: cases,
                        color: '#7289d9',
                        backgroundColor: '#7289d9',
                        borderColor: '#7289d9',
                        fill: false
                    },
                    {
                        label: 'Tode',
                        data: deaths,
                        color: '#b32f38',
                        backgroundColor: '#b32f38',
                        borderColor: '#b32f38',
                        fill: false
                    },
                    {
                        label: 'Erholt',
                        data: recovered,
                        color: '#592ec2',
                        backgroundColor: '#592ec2',
                        borderColor: '#592ec2',
                        fill: false
                    }
                ]
            }
        };

        const image = await canvas.renderToBuffer(configuration);

        const attachment = new discord.MessageAttachment(image);

        message.channel.send(attachment);
    },
    permissions: [],
    requiredRoles: []
}