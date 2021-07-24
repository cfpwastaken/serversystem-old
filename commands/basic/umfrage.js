const utils = require("../../utils");

module.exports = {
    commands: ['question', "q"],
    expectedArgs: '<question>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        message.delete();
        message.channel.send(utils.embed("Question", text, "RANDOM", "Questions")).then(msg=>{
            msg.react('👍').then(r => {
                msg.react('👎');
            });
        });
    },
    permissions: [],
    requiredRoles: []
}