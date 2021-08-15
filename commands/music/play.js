const Discord = require("discord.js");
const utils = require("../../utils");
const ytdl = require("ytdl-core");
const syt = require("yt-search");
const { embed } = require("../../utils");
var queue = new Map();

module.exports = {
    commands: ['play'],
    expectedArgs: '<search query or url>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 9999999999,
    description: "Play a song",
    callback: async function(msg, args, text) {
        if(args[0].startsWith("https://" || "http://")) {
                add(msg, args[0], queue.get(msg.guild.id), queue, undefined);
        } else {
            var search = "";
            for(var i = 0; i < args.length; i++) {
                if(args.length-1 === i) search = search + args[i];
                else search = search + args[i] + " ";
            }
            var searchmsg = await msg.channel.send({ content: ":mag: Searching for " + search + " on YouTube" });
            await syt(search, (err, vid) => {
                if(err) {
                    msg.channel.send({ content: "O_o" });
                    return console.log(err);
                }
                const results = vid.videos
                console.log(results[0]);
                add(msg, results[0].url, queue.get(msg.guild.id), queue, searchmsg);
            });
        }
    },
    permissions: [],
    requiredRoles: []
}

async function add(msg, url, queue, queuelist, searchmsg) {
    const vc = msg.member.voice.channel;
    if(!vc) return msg.channel.send({ embeds: [embed("Error", "You are not in a voice channel.", "red", "Music")] });

    const BotPerms = vc.permissionsFor(msg.client.user);
    if(!BotPerms.has("CONNECT") || !BotPerms.has("SPEAK")) {
        let embed2 = embed("Error", "Something went wrong", "red", "Music");
        if(BotPerms.has("CONNECT") && !BotPerms.has("SPEAK")) embed2.setDescription("I can't talk in this channel.");
        if(!BotPerms.has("CONNECT") && BotPerms.has("SPEAK")) embed2.setDescription("I can't join this channel.");
        else embed2.setDescription("I can't join and talk in this channel.");
        msg.channel.send({ embeds: [embed2] });
    }
    try {
        const songInfo = await ytdl.getInfo(url);
        const song = {
            title: songInfo.player_response.videoDetails.title,
            url: url
        }
        if(searchmsg) searchmsg.delete();
        if(!queue) {
            const queueContruct = {
                textChannel: msg.channel,
                voiceChannel: vc,
                connection: null,
                songs: [],
                volume: 1,
                playing: true,
            };


            queuelist.set(msg.guild.id, queueContruct);
            queueContruct.songs.push(song);
            try {
                vc.join().then(connection => {
                    queueContruct.connection = connection;
                    play(msg.guild, queueContruct.songs[0], queuelist);
                })
            } catch(err) {
                console.log(err);
                msg.channel.send({ embeds: [embed("O_o", "Something went wrong", "red", "Music")] });
            }
        } else {
            let embed2 = new Discord.MessageEmbed();
            embed2.setAuthor(`${msg.author.tag} added a song`, msg.author.displayAvatarURL());
            embed2.setDescription(`Added "${song.title}" to the queue`);
            embed2.setColor("RANDOM");
            queue.songs.push(song)
            //guildQueue.songs.push(song);
            console.log(queue.songs);
            return msg.channel.send({ embeds: [embed2] });
        }
    } catch(e) {
        msg.channel.send({ content: "O_o" });
        console.log(e);
    }
}

async function play(guild, song, queue) {
    const guildQueue = queue.get(guild.id);
    if(!song) {
        guildQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dp = guildQueue.connection.play(ytdl(song.url)).on("finish", () => {
        guildQueue.songs.shift();
        play(guild, guildQueue.songs[0], queue);
    }).on("error", err => console.log(err));
    dp.setVolumeLogarithmic(guildQueue.volume);
    if(!(guildQueue.songs[0] === undefined)) guildQueue.textChannel.send({ embeds: [embed("Now Playing", song.title, "RANDOM", "Music")] });
}

module.exports.add = add;
module.exports.play = play;
module.exports.queue = queue;