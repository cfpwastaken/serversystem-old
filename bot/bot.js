const TOKEN = process.env.token; // Heroku
//const TOKEN = "HksbjxcbsjHGaj6297hjsh8757jsjks"; // Discord Token (HARDCODED)
const PORT = process.env.PORT || 80;





const discord = require("discord.js");
const bot = new discord.Client();
const fs = require("fs");
const xpfile = require("./xp.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");

const path = require("path");

//const ytdl = require("ytdl-core");

//bot.db = require("quick.db");
//bot.canvas = new Canvacord();

bot.on("ready", () => {
    console.log("Ready");
    bot.user.setActivity("-help", {type: "LISTENING"});
    //bot.user.setStatus("dnd");
    //bot.user.setActivity("nicht cfps code", {type: "LISTENING"});

    const baseFile = "command-base.js";
    const commandBase = require(`./commands/${baseFile}`);

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for(const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if(stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else if(file !== baseFile) {
                const option = require(path.join(__dirname, dir, file));
                commandBase(bot, option);
            }
        }
    };

    readCommands("commands");

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
