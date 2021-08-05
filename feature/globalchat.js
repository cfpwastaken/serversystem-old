const Discord = require("discord.js");
const mysql = require("../util/sql");

module.exports = (msg) => {
    // Get the global chat channel
    // TODO: Cache the channels
    mysql.query("SELECT globalchat FROM server WHERE serverid='" + msg.guild.id + "'", (err, result, fields) => {
        if(err) throw err;
        const globalchannel = result[0].globalchat;
        if(msg.channel.id === globalchannel) {
            if(msg.author.bot) return;
            let message = new Discord.MessageEmbed();
            message.setAuthor(msg.author.tag, msg.author.displayAvatarURL({dynamic: true}));
            message.setDescription(msg.content);
            message.setColor("RANDOM");
            message.setFooter(msg.guild.name, msg.guild.iconURL());
            message.setTimestamp();
            msg.delete();
            msg.channel.send(message);
            // console.log(require("../main").bot.guilds.cache);
            require("../main").bot.guilds.cache.forEach(guild => {
                if(guild.id != msg.guild.id) {
                    if(guild) {
                        mysql.query("SELECT globalchat FROM server WHERE serverid='" + guild.id + "'", (err, result, fields) => {
                            if(err) throw err;
                            if(result[0]) {
                                const globalchat = result[0].globalchat;
                                if(globalchat != "0") {
                                    const channel = guild.channels.cache.find(chan => chan.id === globalchat);
                                    if(channel) {
                                        // console.log(channel);
                                        channel.send(message);
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });
};