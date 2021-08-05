require("dotenv").config();
const args = process.argv.slice(2);
// Libraries
const discord = require("discord.js");
const sql = require("./util/sql");
const fs = require("fs");
const path = require("path");
const commandBase = require(`./commands/command-base.js`);

// Mobile
if(args.includes("mobile")) {
    console.log("[General] Setting Browser: Mobile");
    discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android";
}

// Client stuff
const bot = new discord.Client();

// Post Bot Libraries
const DiscoToolsObject = require("discotools"); // npm i discotools #schleichwerbung
const discotools = new DiscoToolsObject.DiscoTools(bot);


// Constants
const token = process.env.TOKEN;

// Exports
module.exports.sql = sql;
module.exports.commandBase = commandBase;
module.exports.bot = bot;

// Events
bot.on("ready", async () => {
    console.log("[Discord] Ready!");
    console.log("[Discord] Bot is in " + bot.guilds.cache.size + " guilds!");
    setStatusBasedOnBranch();

    await discotools.setup();

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for(const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if(stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else if(file !== "command-base.js") {
                const option = require(path.join(__dirname, dir, file));
                commandBase(option);
            }
        }
    };

    readCommands("commands");

    commandBase.listen(bot);
});

bot.on("button", (interaction, id) => {
    if(id === "click_one") {
        discotools.reply(interaction, "You just clicked button one");
    } else if(id === "click_two") {
        discotools.reply(interaction, "You just clicked button two");
    }
});

bot.on("message", async (msg) => {
    console.log(msg.author.tag + " (" + msg.guild.name + "): " + msg.content);
    require("./feature/globalchat.js")(msg);
});

function setStatusBasedOnBranch() {
    const { exec } = require('child_process');
    exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
        if (err) throw err;

        if (typeof stdout === 'string') {
            if(stdout.trim() === "main") {
                bot.user.setPresence({
                    status: "online",
                    activity: {
                        name: "a bot duel",
                        type: "COMPETING"
                    }
                });
            } else {
                bot.user.setPresence({
                    status: "dnd",
                    activity: {
                        name: "for new code on branch " + stdout.trim(),
                        type: "WATCHING"
                    }
                });
            }
        }
    });
}

bot.login(token);