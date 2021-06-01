const discord = require("discord.js");
const fs = require("fs");
const xpfile = require("../xp.json");
const serverStats = require("../servers.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");
const utils = require("../utils/util-functions.js");

module.exports = async function(message) {
    const { content, channel, author, guild, mentions } = message;
    if(!author || author.bot) return;
    // GhostPing Detection
    if(mentions.users.size !== 0) {
        let channelId = serverStats[guild.id].ghostping;
        if(channelId === 0) return;
        
        const embed = new discord.MessageEmbed()
            .setTitle("Ghost Ping")
            .setDescription("Message:\n\n" + content)
            .addField("Channel", channel)
            .addField("Message author", author);
        
        const target = guild.channels.cache.get(channelId);
        if(target) {
            target.send(embed);
        }
    }
}