const TOKEN = process.env.token; // Heroku
//const TOKEN = "HksbjxcbsjHGaj6297hjsh8757jsjks"; // Discord Token (HARDCODED)






const discord = require("discord.js");
const bot = new discord.Client();
const fs = require("fs");
const xpfile = require("./xp.json");

bot.on("ready", () => {
    console.log("[Bot] Bot is now up and running!");
    //bot.user.setActivity("-help", {type: "LISTENING"});
    bot.user.setStatus("dnd");
    bot.user.setActivity("cfps code", {type: "LISTENING"});
});

function embed(title, desc, color, footer) {
    let embed = new discord.MessageEmbed()
    .setTitle(title)
    .setDescription(desc)
    .setColor(color)
    .setFooter(footer + " | ServerSystem");
    return embed;
}

bot.on("message", async message=> {
    if(message.author.bot) return;

    if(message.content.startsWith("-createticket")) {
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

        if(discord.guild.channels.cache.find(cha=>cha.name===`ticket-${username.toLowerCase()}`)) return message.reply("Du hast bereits ein Ticket erstellt!");

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

    }

    if(message.content.startsWith("-closeticket")) {
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

        if(!message.channel.name.includes("ticket") || message.channel.name === "ticket") return;

        if(message.channel.name !== `ticket-${username.toLowerCase()}` && !message.member.roles.cache.find(rl=>rl.name==="Supporter")) return message.reply("Du kannst dieses Ticket nicht beenden!");

        await message.channel.send("Ticket wird geschlossen...");

        await message.channel.delete().catch(err=>{
            if(err) return console.error(err);
        });

    }

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

    if(message.channel.name != "spam") {
        var addXP = Math.floor(Math.random() * 8) + 3;

        if(!xpfile[message.author.id]) {
            xpfile[message.author.id] = {
                xp: 0,
                level: 1,
                reqxp: 100
            };

            fs.writeFile("./xp.json", JSON.stringify(xpfile), function(err) {
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

        fs.writeFile("./xp.json", JSON.stringify(xpfile), function(err) {
            if(err) {
                console.log(err);
            }
        });
    }


    if(message.content.startsWith("-level")) {
        let user = message.mentions.users.first() || message.author;

        if(!xpfile[user.id]) {
            xpfile[user.id] = {
                xp: 0,
                level: 1,
                reqxp: 100
            };

            fs.writeFile("./xp.json", JSON.stringify(xpfile), function(err) {
                if(err) {
                    console.log(err);
                }
            });
        }

        let embed = new discord.MessageEmbed()
        .setTitle("Level")
        .setColor("RANDOM")
        .addField("Level", xpfile[user.id].level)
        .addField("XP", xpfile[user.id].xp)
        .addField("XP benötigt", xpfile[user.id].reqxp);
        
        message.channel.send(embed);
    }

    if(message.content === "-help") {
        message.channel.send(embed("Help", "Commands:\n-serverinfo • Zeigt Infos zum Server an\n-user <ping> • Zeigt Userinfos an\n-clear [nummer] • Löscht [nummer] Nachrichten\n-umfrage [Nachricht] • Erstellt eine Umfrage\nFeatures:\nGlobalchat • Erstelle einen Channel \"global\" und der Globalchat ist fertig!\nXP-System • -level um deine Level zu sehen (Leveln in #spam deaktiviert!)\nWillkommensnachrichten • Werden automatisch in #welcome geschickt.", "RANDOM", "Hilfe"));
    }

    if(message.content.startsWith("-clear")) {
        if(message.member.hasPermission("MANAGE_CHANNELS") || message.member.hasPermission("ADMINISTRATOR")) {
            let msgs = message.content.split(" ").slice(1).join("");

            if(isNaN(msgs)) return message.reply("Geb ne Zahl an du kek");
            message.delete();
            message.channel.bulkDelete(msgs);
            message.channel.send("Habe " + msgs + " Nachrichten gelöscht").then(msg=>msg.delete({timeout: "3000"}));
        } else {
            message.reply("ich denke nicht das du das darfst");
        }
    }

    if(message.content === "-serverinfo") {
        if(!message.guild) return;

        let server = {
            logo: message.guild.iconURL(),
            name: message.guild.name,
            banner: message.guild.bannerURL(),
            members: message.guild.memberCount,
            owner: message.guild.ownerID,
            createdAt: message.guild.createdAt,
            id: message.guild.id,
            region: message.guild.region,
            verified: message.guild.verified
        };

        let embed = new discord.MessageEmbed()
        .setTitle("Serverinfo")
        .setColor("RANDOM")
        .setThumbnail(server.logo)
        .addField("Name", server.name)
        .addField("Banner", server.banner)
        .addField("Nutzer", server.members)
        .addField("Besitzer", server.owner)
        .addField("Erstellt", server.createdAt)
        .addField("Id", server.id)
        .addField("Region", server.region)
        .addField("Verifiziert", server.verified);

        message.channel.send(embed);
        
    }

    if(message.content.startsWith("-user")) {
        let user = message.mentions.users.first() || message.author;

        let userinfo = {
            avatar: user.avatarURL(),
            name: user.username,
            discrim: user.discriminator,
            id: user.id,
            status: user.presence.status,
            bot: user.bot,
            createdAt: user.createdAt
        };

        let embed = new discord.MessageEmbed()
        .setTitle("Nutzerinfo")
        .setColor("RANDOM")
        .setThumbnail(userinfo.avatar)
        .addField("Name", userinfo.name)
        .addField("Discrim", userinfo.discrim)
        .addField("Id", userinfo.id)
        .addField("Status", userinfo.status)
        .addField("Bot", userinfo.bot)
        .addField("Erstellt", userinfo.createdAt);

        message.channel.send(embed);
        
    }

    if(message.content.startsWith("-umfrage")) {
        let text = message.content.split(" ").slice(1).join(" ");
        message.delete();
        message.channel.send(embed("Umfrage", text, "RANDOM", "Umfrage System")).then(msg=>{
            msg.react('👍').then(r => {
                msg.react('👎');
            });
        });
    }
});

bot.on("guildMemberAdd", function(member) {
    let channel = member.guild.channels.cache.find(ch => ch.name === "welcome");
    channel.send(member.displayName + " ist beigetreten! :tada:");
});

bot.on("guildMemberRemove", function(member) {
    let channel = member.guild.channels.cache.find(ch => ch.name === "welcome");
    channel.send(member.displayName + " hat den Server verlassen! :sob:");
});

bot.login(TOKEN);
