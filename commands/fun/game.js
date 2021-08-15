const utils = require("../../utils");

module.exports = {
    commands: ['game', "activity", "startgame", "startactivity"],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 1,
    description: "Start a voice channel activity. Like a game or YouTube",
    callback: async function(msg, arguments, text) {
        //const vc = msg.member.voice.channel;
        //if(!vc) return msg.channel.send(utils.embed("Error", "You are not in a voice channel.", "red", "Music"));
        /*
        msg.reply("Here: discord.gg/" + await require("../../main").discotools.startVoiceActivity(vc, text) + "\nTrubz? You need to join it manually. Go to the + at the bottom of the servers list and join it using the code.");
        */
       // TODO: fix discotools and stuff
    },
    permissions: [],
    requiredRoles: []
}