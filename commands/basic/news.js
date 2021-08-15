const utils = require("../../utils");

module.exports = {
    commands: ['news'],
    expectedArgs: '<message>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 999999999,
    description: "Pong!",
    callback: async function(msg, arguments, text) {
        msg.delete();
        msg.channel.send({ embeds: [utils.embed(":loudspeaker: News :newspaper:", text, "RANDOM", "News")] }).then(msg2=>{
            if(msg2.crosspostable) {
                msg2.crosspost();
            }
        });
    },
    permissions: [],
    requiredRoles: []
}