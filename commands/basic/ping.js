const utils = require("../../utils");

module.exports = {
    commands: ['ping'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    description: "Pong!",
    callback: async function(msg, arguments, text) {
        msg.channel.send(utils.embed(":ping_pong: Pong!", `Latency: ${Date.now() - msg.createdTimestamp}ms\nAPI: ${Math.round(msg.client.ws.ping)}ms`, "RANDOM"));
    },
    permissions: [],
    requiredRoles: []
}