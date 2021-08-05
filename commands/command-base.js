const fs = require("fs");
const sql = require("../util/sql");

const Discord = require("discord.js");

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
        'USE_SLASH_COMMANDS',
        'REQUEST_TO_SPEAK',
        'MANAGE_THREADS',
        'USE_PUBLIC_THREADS',
        'USE_PRIVATE_THREADS'
    ];

    for(const permission of permissions) {
        if(!validPermissions.includes(permission)) {
            throw new Error("Unknown Permission"+permission);
        }
    }
}

const allCommands = {};
const cmds = []; // this is different

module.exports = (commandOptions) => {
    let {
        commands,
        permissions = [],
        description
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

    for(const command of commands) {
        allCommands[command] = {
            ...commandOptions,
            commands,
            permissions,
            description
        };
    }

    cmds.push({
        ...commandOptions,
        commands,
        permissions,
        description
    });
}

module.exports.listen = (bot) => {
    bot.on("message", message => {
        if(message.author.bot) return;

        // Check if the server is in database
        sql.query("SELECT * FROM server WHERE serverid='" + message.guild.id + "'", (error, results, fields) => {
            if(error) throw error;
            if(results.length === 0) {
                console.log("[Message] Guild is not in Database, adding it with default values...");
                sql.query("INSERT INTO server (serverid, prefix, globalchat) VALUES ('" + message.guild.id + "', '-', '0')");
            }
            
            sql.query("SELECT prefix FROM server WHERE serverid='" + message.guild.id + "'", (error, results, fields) => {
                if(error) throw error;
                var prefix = results[0].prefix;
                
                const { member, content, guild } = message;

                const arguments = content.split(/[ ]+/);
        
                const name = arguments.shift();

                if(name.startsWith(prefix)) {
                    const command = allCommands[name.replace(prefix, '')];
                    if(!command) {
                        return;
                    }

                    const {
                        permissions,
                        permissionError = "I dont think you should be able to execute this command :grin:",
                        requiredRoles = [],
                        minArgs = 0,
                        maxArgs = null,
                        expectedArgs,
                        callback,
                        clientcallback
                    } = command;

                    console.log(`[${message.author.tag}] Executing Command ${name.replace(prefix, '')}`);
                    
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

                    if(arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
                        message.reply(`Incorrect syntax! Use ${prefix}${name.replace(prefix, '')} ${expectedArgs}`);
                        return
                    }

                    try {
                        if(!clientcallback) callback(message, arguments, arguments.join(" "));
                        if(clientcallback) clientcallback(message, arguments, arguments.join(" "), client);
                    } catch(e) {
                        console.error(e);
                        message.reply("O_o");
                    }
                }
            });
        });
    })
}

module.exports.allCommands = allCommands;
module.exports.commands = cmds;