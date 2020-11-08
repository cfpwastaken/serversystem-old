function checkServerStats(guildid) {
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
}

module.exports = (bot, aliases, callback) => {
    if(typeof aliases === "string") {
        aliases = [aliases];
    }
    bot.on("message", message => {
        checkServerStats(message.guild.id);

        let prefix = serverstats[message.guild.id].prefix;

        const { content } = message;

        aliases.forEach(alias => {
            const command = `${prefix}${alias}`;

            if(content.startsWith(`${command} `) || content === command) {
                console.log(`[${message.author.tag}] Executing Command ${command}`);
                callback(message);
            }
        })
    });
}