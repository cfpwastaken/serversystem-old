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
        if(target.id === require("../../main").bot.user.id) {
            return msg.reply("After all of my work, this is what you give me?");
        }
        if(args.length == 1) {
            target.kick();
            msg.channel.send("You have kicked " + target.user.tag);
        } else {
            args.shift();
            const reason = args.join(" ");
            target.kick(reason);
            if(target.kickable) {
                msg.channel.send("You have kicked " + target.user.tag + " with reason " + reason);
            } else {
                msg.reply("I can't do that.");
            }
        }
    },
    permissions: ["KICK_MEMBERS"],
    requiredRoles: []
}