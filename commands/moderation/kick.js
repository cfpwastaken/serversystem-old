const utils = require("../../utils");

module.exports = {
    commands: ['kick'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 999999999,
    description: "Kick a user",
    callback: async function(msg, args, text) {
        const target = msg.mentions.members.first();
        if(!target) {
            return msg.reply("Please specify a target.");
        }
        if(args.length == 1) {
            target.kick();
            msg.channel.send("You have kicked " + target.user.tag);
        } else {
            args.shift();
            const reason = args.join(" ");
            target.kick(reason);
            msg.channel.send("You have kicked " + target.user.tag + " with reason " + reason);
        }
    },
    permissions: ["KICK_MEMBERS"],
    requiredRoles: []
}