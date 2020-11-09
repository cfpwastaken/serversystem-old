//const serverstats = require("../servers.json");
const fs = require("fs");

const discord = require("discord.js");
//const xpfile = require("../xp.json");
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

/*function checkServerStats(guildid) {
    if(!serverstats[guildid]) {
        serverstats[guildid] = {
            prefix: "-",
            welcome: "welcome"
        };
    }

    if(!serverstats[guildid].prefix) {serverstats[guildid].prefix = "-";}
    if(!serverstats[guildid].welcome) {serverstats[guildid].welcome = "welcome";}

    fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err) {
        if(err) {
            console.log(err);
        }
    });
}*/

const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ];

    for(const permission of permissions) {
        if(!validPermissions.includes(permission)) {
            throw new Error("Unknown Permission"+permission);
        }
    }
}

module.exports = (bot, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = "I dont think you should be able to execute this command :grin:",
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback
    } = commandOptions;

    if(typeof commands === "string") {
        commands = [commands]
    }

    console.log(`[Command Handler] Registering command ${commands[0]}`);

    if(permissions.length) {
        if(typeof permissions === "string") {
            permissions = [permissions];
        }

        validatePermissions(permissions);
    }

    bot.on("message", message => {
        if(message.author.bot) return;

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
        /*if(message.channel.name != "spam") {
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
    
                message.reply(embed("XP", "Du bist nun Level " + xpfile[message.author.id].level + " :tada:", "RANDOM", "XP System"));
            }
    
            fs.writeFile("../xp.json", JSON.stringify(xpfile), function(err) {
                if(err) {
                    console.log(err);
                }
            });
        }*/

        //checkServerStats(message.guild.id);
    
        //let prefix = serverstats[message.guild.id].prefix;
        let prefix = "-";

        // GetPrefix
        if(message.content.startsWith("<@!623913139980992569>")) {
            message.reply("Mein Prefix hier ist: **" + prefix + "**");
        }

        const { member, content, guild } = message;

        for(const alias of commands) {
            if(content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()} `) || content.toLowerCase() === (`${prefix}${alias.toLowerCase()}`)) {
                console.log(`[${message.author.tag}] Executing Command ${alias}`);
                
                for(const permission of permissions) {
                    if(!member.hasPermission(permission)) {
                        message.reply(permissionError);
                        return;
                    }
                }

                for(const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(role => role.name === requiredRole);

                    if(!role || !member.roles.cache.has(role.id)) {
                        message.reply(`You need the ${requiredRole} role to exeute this command.`);
                        return;
                    }
                }

                const arguments = content.split(/[ ]+/);

                arguments.shift();

                if(arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
                    message.reply(`Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`);
                    return
                }

                callback(message, arguments, arguments.join(" "));

                return;
            }
        }
    })
}