const utils = require("../../utils");

module.exports = {
    commands: ['say', 'repeat'],
    expectedArgs: '<text>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 999999999999999,
    description: "Repeats your message!",
    callback: async function(msg, args, text) {
        if((text.includes("I") || text.includes("i")) && text.includes("dumb") && !text.includes("not")) {
            msg.channel.send({ content: "I know." });
        } else {
            msg.channel.send({ content: text });
            msg.delete();
        }
    },
    permissions: [],
    requiredRoles: []
}