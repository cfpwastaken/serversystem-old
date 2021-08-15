const utils = require("../../utils");
const mysql = require("../../util/sql");

module.exports = {
    commands: ['setglobal'],
    expectedArgs: '<new global channel>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 1,
    description: "Set the global channel on the server",
    callback: async function(msg, args, text) {
        const channel = msg.mentions.channels.first();
        if(!channel) {
            return msg.reply({ content: "Please specify a channel." });
        }
        mysql.query("UPDATE server SET globalchat='" + channel.id + "' WHERE serverid='" + msg.guild.id + "'");
        msg.reply({ content: "Ok, the new global channel on this server is **" + channel.name + "**" });
    },
    permissions: ["ADMINISTRATOR"],
    requiredRoles: []
}