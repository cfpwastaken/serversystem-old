const utils = require("../../utils");

module.exports = {
    commands: ['skip'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    description: "Skip song",
    callback: async function(msg, arguments, text) {
        require("./play").queue.get(msg.guild.id).songs.shift();
        require("./play").play(msg.guild, require("./play").queue.get(msg.guild.id).songs[0], require("./play").queue);
    },
    permissions: [],
    requiredRoles: []
}