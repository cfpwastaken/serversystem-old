const utils = require("../../utils");
const mysql = require("../../util/sql");

module.exports = {
    commands: ['setprefix'],
    expectedArgs: '<new prefix>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 1,
    description: "Set the prefix on the server",
    callback: async function(msg, args, text) {
        const prefix = args[0];
        mysql.query("UPDATE server SET prefix='" + prefix + "' WHERE serverid='" + msg.guild.id + "'");
        msg.reply({ content: "Ok, the new prefix on this server is **" + prefix + "**" });
    },
    permissions: ["ADMINISTRATOR"],
    requiredRoles: []
}