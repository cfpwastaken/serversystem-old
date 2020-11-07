const TOKEN = process.env.token; // Heroku
//const TOKEN = "HksbjxcbsjHGaj6297hjsh8757jsjks"; // Discord Token (HARDCODED)
const PORT = process.env.PORT || 80;





const discord = require("discord.js");
const bot = new discord.Client();
const fs = require("fs");
const xpfile = require("./xp.json");
const ascii = require("ascii-art");
const serverstats = require("./servers.json");
const canvacord = require("canvacord");

//const ytdl = require("ytdl-core");

//bot.db = require("quick.db");
//bot.canvas = new Canvacord();

bot.on("ready", () => {
    console.log("Ready");
    bot.user.setActivity("-help", {type: "LISTENING"});
    //bot.user.setStatus("dnd");
    //bot.user.setActivity("nicht cfps code", {type: "LISTENING"});
});

function embed(title, desc, color, footer) {
    let embed = new discord.MessageEmbed()
    .setTitle(title)
    .setDescription(desc)
    .setColor(color)
    .setFooter(footer + " | ServerSystem");
    return embed;
}

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

bot.on("message", async message=> {
    if(message.author.bot) return;

    checkServerStats(message.guild.id);

    let prefix = serverstats[message.guild.id].prefix;

    if(message.content.includes("hure") || message.content.includes("spast") || message.content.includes("huso") || message.content.includes("hurensohn")) {
        message.reply("nicht beleidigen!");
        message.delete();
        return;
    }

    if(message.content.startsWith(prefix + "createticket")) {
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

    }

    if(message.content.startsWith(prefix + "closeticket")) {
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

    if(message.content.startsWith(prefix + "level")) {
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

        /*let embed = new discord.MessageEmbed()
        .setTitle("Level")
        .setColor("RANDOM")
        .addField("Level", xpfile[user.id].level)
        .addField("XP", xpfile[user.id].xp)
        .addField("XP benötigt", xpfile[user.id].reqxp);*/
        const card = new canvacord.Rank()
            .setUsername(message.author.username)
            .setDiscriminator(message.author.discriminator)
            .setLevel(parseInt(xpfile[user.id].level))
            .setCurrentXP(parseInt(xpfile[user.id].xp))
            .setRequiredXP(parseInt(xpfile[user.id].reqxp))
            .setAvatar(message.author.displayAvatarURL({format: "png", size: 1024}));
        
        const img = await card.build();

        message.channel.send(new discord.MessageAttachment(img, "card.png"));
    }

    if(message.content === prefix + "help" || message.content === "-help") {
        message.channel.send(embed("Help", "**Commands:**\n-ping • Zeigt die Leistung des Bots an\n-serverinfo • Zeigt Infos zum Server an\n-user <ping> • Zeigt Userinfos an\n-clear [nummer] • Löscht [nummer] Nachrichten\n-umfrage [Nachricht] • Erstellt eine Umfrage\n-meme <meme> • Befüllt dich mit Memes!\n**Features:**\nGlobalchat • Erstelle einen Channel \"global\" und der Globalchat ist fertig!\nXP-System • -level um deine Level zu sehen (Leveln in #spam deaktiviert!)\nWillkommensnachrichten • Werden automatisch in #welcome geschickt.\nAutoMod • Moderiert Automatisch für dich.\nTicketSystem • benötigt eine Rolle \"Supporter\" und einen Channel #ticket, -createticket und -closeticket", "RANDOM", "Hilfe"));
    }

    if(message.content.startsWith(prefix + "clear")) {
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

    if(message.content === prefix + "serverinfo") {
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

    if(message.content.startsWith(prefix + "user")) {
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

    if(message.content.startsWith(prefix + "umfrage")) {
        let text = message.content.split(" ").slice(1).join(" ");
        message.delete();
        message.channel.send(embed("Umfrage", text, "RANDOM", "Umfrage System")).then(msg=>{
            msg.react('👍').then(r => {
                msg.react('👎');
            });
        });
    }

    if(message.content.startsWith(prefix + "ping")) {
        message.channel.send("Pong! :ping_pong: Dauerte " + bot.ws.ping + "ms")
    }

    if(message.content.startsWith(prefix + "ascii")) {
        let content = message.content.split(" ").slice(1).join(" ");

        if(!content) return message.reply("-ascii Hallo Welt");

        ascii.font(content, "Doom", function(err, result){
            if(err) {
                return message.channel.send("O_o");
            }

            message.channel.send("```" + result + "```");
        });

    }

    if(message.content.startsWith("<@!623913139980992569>")) {
        message.reply("Mein Prefix hier ist: **" + prefix + "**");
    }

    if(message.content.startsWith(prefix + "setprefix")) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Ich denke nicht das du das darfst.");

        let newprefix = message.content.split(" ").slice(1).join("");

        serverstats[message.guild.id].prefix = newprefix;

        message.channel.send("Der neue Prefix ist **" + newprefix + "**");

        fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err) {
            if(err) {
                console.log(err);
            }
        });
    }

    if(message.content.startsWith(prefix + "setwelcome")) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Ich denke nicht das du das darfst.");

        let newwelcome = message.content.split(" ").slice(1).join("");

        serverstats[message.guild.id].welcome = newwelcome;

        message.channel.send("Der neue Welcomechannel ist **" + newwelcome + "**");

        fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err) {
            if(err) {
                console.log(err);
            }
        });
    }

    if(message.content.startsWith(prefix + "meme")) {
        var subreddits;
        var name = "Meme";
        if(message.content.split(" ").length === 1) {
            subreddits = [
                "memes"
            ];
        } else {
            var memetype = message.content.split(" ")[1];
            if(memetype == "amongus") {
                subreddits = [
                    "amongusmemes"
                ];
                name = "Among Us Meme";
            } else {
                message.reply("Sorry, ich kenne r/" + memetype + " nicht!");
                return;
            }
        }
        let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length))];

        let img = await require("imageapi.js")(subreddit);

        const Embed = new discord.MessageEmbed()
        .setTitle(name)
        .setColor("RANDOM")
        .setImage(img);

        message.channel.send(Embed)
    }








    // MUSIC
    if(message.content.startsWith(prefix + "play")) {
        const args = message.content.substring(prefix.length).split(" ");
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) {
            message.reply("Du musst in einem VoiceChannel sein!")
            return;
        }
        const perms= voiceChannel.permissionsFor(message.client.user);
        if(!perms.has("CONNECT")) return message.channel.send("Hab keine rechte für den Channel ):");
        if(!perms.has("SPEAK")) return message.channel.send("Darf in dem Channel nix abspielen ):");

        try {
            var connection = await voiceChannel.join();
        } catch(O_o) {
            console.log("O_o");
            message.channel.send("O_o");
            return;
        }
        console.log(args[1]);

        const songInfo = await ytdl.getInfo(args[1]);
        const song = {
          title: songInfo.title,
          url: songInfo.video_url
        };


        const dispatcher = connection
      .play(ytdl(song.url))
      .on("finish", () => {
        
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(5 / 5);
    }
    if(message.content.startsWith(prefix + "stop")) {
        if(!message.member.voice.channel) return message.channel.send("Du bist in keinem VoiceChannel!");
        message.member.voice.channel.leave();
    }

});

bot.on("guildMemberAdd", function(member) {
    checkServerStats(member.guild.id);
    let channel = member.guild.channels.cache.find(ch => ch.name === serverstats[member.guild.id].welcome);
    if(!channel) return;
    channel.send(member.displayName + " ist beigetreten! :tada:");
});

bot.on("guildMemberRemove", function(member) {
    checkServerStats(member.guild.id);
    let channel = member.guild.channels.cache.find(ch => ch.name === serverstats[member.guild.id].welcome);
    if(!channel) return;
    channel.send(member.displayName + " hat den Server verlassen! :sob:");
});

bot.login(TOKEN);
