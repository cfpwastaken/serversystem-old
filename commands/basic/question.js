const utils = require("../../utils");

module.exports = {
    commands: ['question', "q"],
    expectedArgs: '<question>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 99999999,
    description: "Ask a question",
    callback: (message, arguments, text) => {
        message.delete();
        message.channel.send({ embeds: [utils.embed("Question", text, "RANDOM", "Questions")] }).then(msg=>{
            msg.react('👍').then(r => {
                msg.react('👎');
            });
        });
    },
    permissions: [],
    requiredRoles: []
}