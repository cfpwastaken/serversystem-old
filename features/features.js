const discord = require("discord.js");
const fs = require("fs");
const xpfile = require("../xp.json");
const serverstats = require("../servers.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");
const utils = require("../utils/util-functions.js");

module.exports = (message) => {
    const prefix = serverstats[message.guild.id].prefix;

    // AutoMod
    if(message.content.includes("hure") || message.content.includes("spast") || message.content.includes("huso") || message.content.includes("hurensohn")) {
        message.reply("nicht beleidigen!");
        message.delete();
        return;
    }

    // Globalchat
    if(message.channel.name == "global") {
        bot.guilds.cache.forEach(guild=>{
            //if(guild == message.guild) return;
            let channel = guild.channels.cache.find(ch=>ch.name === "global");
            
            if(!channel) return;
            let embed = new discord.MessageEmbed()
            .setAuthor(message.author.tag + " | Global Chat")
            .setColor("RANDOM")
            .setDescription(message.content)
            .setFooter("Server: " + message.guild.name)
            .setTimestamp();
            channel.send(embed);
        });
    }

    // XP
    if(message.channel.name != "spam") {
        var addXP = Math.floor(Math.random() * 8) + 3;

        if(!xpfile[message.author.id]) {
            xpfile[message.author.id] = {
                xp: 0,
                level: 1,
                reqxp: 100
            };

            fs.writeFile("../xp.json", JSON.stringify(xpfile), function(err) {
                if(err) {
                    console.log(err);
                }
            });
        }

        xpfile[message.author.id].xp += addXP;

        if(xpfile[message.author.id].xp > xpfile[message.author.id].reqxp) {
            xpfile[message.author.id].xp -= xpfile[message.author.id].reqxp;
            xpfile[message.author.id].reqxp *= 1.25;
            xpfile[message.author.id].reqxp = Math.floor(xpfile[message.author.id].reqxp);
            xpfile[message.author.id].level += 1;

            message.reply(utils.embed("XP", "Du bist nun Level " + xpfile[message.author.id].level + " :tada:", "RANDOM", "XP System"));
        }

        fs.writeFile("../xp.json", JSON.stringify(xpfile), function(err) {
            if(err) {
                console.log(err);
            }
        });
    }
    
    // GetPrefix
    if(message.content.startsWith("<@!623913139980992569>")) {
        message.reply("Mein Prefix hier ist: **" + prefix + "**");
    }

    // Nickname Moderation
    if(message.author.name) {
        if(message.member.displayName.startsWith("cfp")) {
            message.member.setNickname("Moderated Nickname");
        }
    }
};