const ascii = require("ascii-art");

module.exports = {
    commands: ['ascii'],
    expectedArgs: '<text>',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 1,
    maxArgs: 9999999999999,
    description: "Create ASCII art from your text",
    callback: (message, arguments, text) => {
        let content = message.content.split(" ").slice(1).join(" ");

        ascii.font(content, "Doom", function(err, result){
            if(err) {
                return message.channel.send("O_o");
            }

            message.channel.send("```" + result + "```");
        });
    },
    permissions: [],
    requiredRoles: []
}