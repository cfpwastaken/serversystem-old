const axios = require("axios");

module.exports = {// adding some typos to the commands list because i dont know how to write quote
    commands: ['quote', 'qoute', 'quoute'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    callback: async function(message, arguments, text) {
        const url = "http://api.quotable.io/random";
        let { data } = await axios.get(url);

        message.channel.send(data["content"] + " *~" + data["author"] + "*");
    },
    permissions: [],
    requiredRoles: []
}