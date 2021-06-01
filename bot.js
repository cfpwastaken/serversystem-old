const env = require("dotenv");
env.config();

const Discord = require("discord.js");
const bot = new Discord.Client();
const token = process.env.TOKEN;
const fs = require("fs");
const Canvas = require("canvas");
const path = require("path");
const serverstats = require("./servers.json");

const { Player } = require("discord-player");
const player = new Player(bot);
bot.player = player;
bot.player.on('trackStart', (message, track) => message.channel.send(`Now playing ${track.title}...`))

bot.setMaxListeners(99999999);

bot.on("ready", () => {
    console.log("Ready");
    //bot.user.setActivity("-help", {type: "LISTENING"});
    //bot.user.setStatus("dnd");
    bot.user.setActivity("nicht cfps code", {type: "LISTENING"});

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
                commandBase(bot, option, bot);
            }
        }
    };

    readCommands("commands");
});

bot.on("message", (message) => {
    require("./features/features.js")(message);
});

bot.on("messageDelete", (message) => {
    require("./features/messageDelete.js")(message);
});

bot.on("guildMemberAdd", async function(member) {
    //checkServerStats(member.guild.id);
    //let channel = member.guild.channels.cache.find(ch => ch.name === serverstats[member.guild.id].welcome);
    let channel = member.guild.channels.cache.find(ch => ch.name === "welcome");
    if(!channel) {
        console.log("adw");
        return;
    }
    const canvas = Canvas.createCanvas(300, 168);
    const ctx = canvas.getContext("2d");

    const bg = await Canvas.loadImage(
        path.join(__dirname, "bg.png")
    );

    let x = 0;
    let y = 0;
    ctx.drawImage(bg, x, y);

    const att = new discord.MessageAttachment(canvas.toBuffer());
    channel.send(att);
    //channel.send(member.displayName + " ist beigetreten! :tada:");
});

bot.on("guildMemberRemove", function(member) {
    //checkServerStats(member.guild.id);
    //let channel = member.guild.channels.cache.find(ch => ch.name === serverstats[member.guild.id].welcome);
    let channel = member.guild.channels.cache.find(ch => ch.name === "welcome");
    if(!channel) return;
    channel.send(member.displayName + " hat den Server verlassen! :sob:");
});

module.exports = {
    setPrefix: (guild, pref) => {
        console.log("Hi from Bot");
        serverstats[guild].prefix = pref;
    }
}

bot.login(token);