const utils = require("../../utils");

module.exports = {
    commands: ['bots'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    description: "Show other bots by me",
    callback: async function(msg, arguments, text) {
        msg.channel.send({ embeds: [utils.embed("Other Bots by Cfp", "")] });
    },
    permissions: [],
    requiredRoles: []
}