const discord = require("discord.js");
const fs = require("fs");
//const xpfile = require("../../xp.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");

function embed(title, desc, color, footer) {
    let embed = new discord.MessageEmbed()
    .setTitle(title)
    .setDescription(desc)
    .setColor(color)
    .setFooter(footer + " | ServerSystem");
    return embed;
}

module.exports = {
    commands: ['createticket'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    callback: async function(message, arguments, text) {
        let rawusername = message.author.username.split("").slice(0);

        let username = "";

        for(i=0;i<rawusername.length;i++){
            if(rawusername[i].toLowerCase() == "a"
            || rawusername[i].toLowerCase() == "b"
            || rawusername[i].toLowerCase() == "c"
            || rawusername[i].toLowerCase() == "d"
            || rawusername[i].toLowerCase() == "e"
            || rawusername[i].toLowerCase() == "f"
            || rawusername[i].toLowerCase() == "g"
            || rawusername[i].toLowerCase() == "h"
            || rawusername[i].toLowerCase() == "i"
            || rawusername[i].toLowerCase() == "j"
            || rawusername[i].toLowerCase() == "k"
            || rawusername[i].toLowerCase() == "l"
            || rawusername[i].toLowerCase() == "m"
            || rawusername[i].toLowerCase() == "n"
            || rawusername[i].toLowerCase() == "o"
            || rawusername[i].toLowerCase() == "p"
            || rawusername[i].toLowerCase() == "q"
            || rawusername[i].toLowerCase() == "r"
            || rawusername[i].toLowerCase() == "s"
            || rawusername[i].toLowerCase() == "t"
            || rawusername[i].toLowerCase() == "u"
            || rawusername[i].toLowerCase() == "v"
            || rawusername[i].toLowerCase() == "w"
            || rawusername[i].toLowerCase() == "x"
            || rawusername[i].toLowerCase() == "y"
            || rawusername[i].toLowerCase() == "z"
            || rawusername[i].toLowerCase() == "0"
            || rawusername[i].toLowerCase() == "1"
            || rawusername[i].toLowerCase() == "2"
            || rawusername[i].toLowerCase() == "3"
            || rawusername[i].toLowerCase() == "4"
            || rawusername[i].toLowerCase() == "5"
            || rawusername[i].toLowerCase() == "6"
            || rawusername[i].toLowerCase() == "7"
            || rawusername[i].toLowerCase() == "8"
            || rawusername[i].toLowerCase() == "9"){
                username+=rawusername[i].toLowerCase();
            }
        }

        if(message.channel.name !== "ticket") return message.reply("Du kannst in diesem Channel kein Ticket erstellen!");
        
        message.delete();

        let category = message.guild.channels.cache.find(ct=>ct.name === "tickets" && ct.type === "category");

        if(!category) await message.guild.channels.create("tickets", {type: "category"}).then(cat=>category = cat);

        if(message.guild.channels.cache.find(cha=>cha.name===`ticket-${username.toLowerCase()}`)) return message.reply("Du hast bereits ein Ticket erstellt!");

        let supporter = message.guild.roles.cache.find(rl=>rl.name==="Supporter");

        if(!supporter) return message.reply("Eine Supporter rolle konnte nicht gefunden werden, stelle sicher das die Supporterrolle \"Supporter\" heißt!");

        await message.guild.channels.create(`ticket-${message.author.username}`, {type:"text"}).then(ch=>{
            ch.setParent(category);
            ch.setTopic("Ticket von " + message.author.username);
            ch.overwritePermissions([
                {
                    id: message.guild.id,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES"]
                },
                {
                    id: message.author.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES"]
                }
            ]);

            ch.send(`Hey <@&${supporter.id}>, hier braucht jemand hilfe!`);
        }).catch(err=>{
            if(err) return message.channel.send("Ein Fehler ist aufgetreten! " + err);
        });

        message.reply("Ein Ticketchannel wurde erstellt. Bitte geh in diesen Channel und beschreibe dein Problem.");
    },
    permissions: [],
    requiredRoles: []
}