const utils = require("../../utils");

module.exports = {
    commands: ['help'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    description: "Get help",
    callback: async function(msg, arguments, text) {
        const {commands} = require("../command-base");
        var desc = "";
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            // msg.channel.send(utils.embed(command.commands[0], command.description, "RANDOM", "Help"));
            if(!command.hidden) desc = desc + `\n${command.commands[0]}${(command.expectedArgs == "") ? " " + command.expectedArgs : ""} - ${command.description}`;
        }
        if(desc.length >= 2000) {
            msg.channel.send({ embeds: [utils.embed("Oops", "Help message is too long for discord", "F70000", "Error")] });
        } else {
            msg.channel.send({ embeds: [utils.embed("Help", desc, "RANDOM", "Help")] });
        }
    },
    permissions: [],
    requiredRoles: []
}