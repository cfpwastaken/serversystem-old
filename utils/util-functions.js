const serverstats = require("../servers.json");
const discord = require("discord.js");
const fs = require("fs");
const xpfile = require("../xp.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");
const utils = require("../utils/util-functions.js");

module.exports = {
    embed(title, desc, color, footer) {
        let embed = new discord.MessageEmbed()
        .setTitle(title)
        .setDescription(desc)
        .setColor(color)
        .setFooter(footer + " | ServerSystem");
        return embed;
    },
    
    checkServerStats(guildid) {
        if(!serverstats[guildid]) {
            serverstats[guildid] = {
                prefix: "-",
                welcome: "welcome",
                modnickname: "SeRvErSyStEm2020!",
                ghostping: "0",
                ticket: "ticket",
                transcript: "transcript",
                support: "Supporter",
                ticketcat: "tickets"
            };
        }
    
        if(!serverstats[guildid].prefix) {serverstats[guildid].prefix = "-";}
        if(!serverstats[guildid].welcome) {serverstats[guildid].welcome = "welcome";}
        if(!serverstats[guildid].modnickname) {serverstats[guildid].modnickname = "SeRvErSyStEm2020!";}
        if(!serverstats[guildid].ghostping) {serverstats[guildid].ghostping = "0";}
        if(!serverstats[guildid].ticket) {serverstats[guildid].ticket = "ticket";}
        if(!serverstats[guildid].transcript) {serverstats[guildid].transcript = "transcript";}
        if(!serverstats[guildid].support) {serverstats[guildid].support = "Supporter";}
        if(!serverstats[guildid].ticketcat) {serverstats[guildid].ticketcat = "tickets";}
    
        fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err) {
            if(err) {
                console.log(err);
            }
        });
    }
};
