const discord = require("discord.js");
const fs = require("fs");
const xpfile = require("../xp.json");
const ascii = require("ascii-art");
const canvacord = require("canvacord");

function embed(title, desc, color, footer) {
    let embed = new discord.MessageEmbed()
    .setTitle(title)
    .setDescription(desc)
    .setColor(color)
    .setFooter(footer + " | ServerSystem");
    return embed;
}

module.exports = {
    commands: ['help', 'h'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    callback: (msg, arguments, text) => {
        let embed = new discord.MessageEmbed()
        .setTitle("Server System")
        .setColor("RANDOM")
        .setDescription("setprefix • Setzt den Prefix\n"+
                        "setwelcome • Setzt den Welcomechannel\n"+
                        "createticket • Erstellt ein Ticket (nur in #ticket)\n"+
                        "closeticket • Schließt das Ticket.\n"+
                        "ascii • ASCII Text\n"+
                        "clear • Chat leeren\n"+
                        "invite • Bot adden (;\n"+
                        "level • Level anzeigen\n"+
                        "meme • Befüllt dich mit freshen memez\n"+
                        "ping • Geschwindigkeit vom Bot anzeigen\n"+
                        "serverinfo • Zeigt info zum Server an\n"+
                        "umfrage • Startet eine Umfrage\n"+
                        "userinfo • Zeigt info zu einem User an\n"+
                        "\n"+
                        "Features:\n"+
                        "AutoMod • Löscht beleidigungen automatisch.\n"+
                        "Globalchat • Globalchat ist in jedem channel der \"#global\" heißt");
    },
    permissions: [],
    requiredRoles: []
}