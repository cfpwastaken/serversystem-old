module.exports = {
    commands: ['invite'],
    expectedArgs: '',
    permissionError: 'I dont think you should be able to execute this command :grin:',
    minArgs: 0,
    maxArgs: 0,
    description: "Add me to your server!",
    callback: (msg, arguments, text) => {
        msg.reply("https://discord.com/oauth2/authorize?client_id=623913139980992569&permissions=8&scope=bot :grin:");
    },
    permissions: [],
    requiredRoles: []
}